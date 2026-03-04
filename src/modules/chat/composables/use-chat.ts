import { onMounted, onUnmounted, ref } from 'vue';
import { chatService, getSessionId, type Message } from '../services/chat-service';

// Shared state
const messages = ref<Message[]>([]);
const isOpen = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
let eventSource: EventSource | null = null;

export function useChat() {
    const toggleChat = () => {
        isOpen.value = !isOpen.value;
        if (isOpen.value && messages.value.length === 0) {
            refreshMessages().then();
        }
    };

    const refreshMessages = async () => {
        // We only set isLoading to true for the first fetch or when explicitly necessary
        // Subsequent background refreshes via SSE might not want a full loading state
        const isFirstLoad = messages.value.length === 0;
        if (isFirstLoad) isLoading.value = true;

        try {
            messages.value = await chatService.fetchMessages();
        } finally {
            if (isFirstLoad) isLoading.value = false;
        }
    };

    const connectSSE = () => {
        if (eventSource) return;

        const url = chatService.getSSEUrl();
        eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            try {
                const payload = JSON.parse(event.data);

                if (payload.message) {
                    console.log('SSE message received');

                    messages.value.push(payload.message);
                }
            } catch {
                // Ignore keep-alive comments or malformed payloads
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource?.close();
            eventSource = null;
            // Attempt to reconnect after a delay
            setTimeout(connectSSE, 5000);
        };
    };

    const disconnectSSE = () => {
        if (eventSource) {
            eventSource.close();
            eventSource = null;
        }
    };

    const send = async () => {
        if (!newMessage.value.trim()) return;

        const text = newMessage.value;
        const uid = getSessionId();

        // Optimistic update: Add message to UI immediately
        const tempId = `temp-${Date.now()}`;
        const tempMsg: Message = {
            id: tempId,
            uid: uid,
            direction: 'outgoing',
            message: text,
            timestamp: Date.now(),
        };

        messages.value.push(tempMsg);
        newMessage.value = '';

        try {
            await chatService.sendMessage(text);
            // We don't call refreshMessages() here.
            // We wait for the SSE 'update' event to trigger the source-of-truth refetch.
        } catch (error) {
            console.error('Error sending message:', error);
            // Remove the optimistic message if it failed
            messages.value = messages.value.filter((m) => m.id !== tempId);
            // Optionally restore the input
            newMessage.value = text;
        }
    };

    // Initialize SSE on first use of the composable
    // In a multi-page app, you might want this to be global
    // but here it's shared state anyway.
    onMounted(() => {
        connectSSE();
    });

    onUnmounted(() => {
        disconnectSSE();
    });

    // We don't necessarily want to disconnect on unmount if it's shared state
    // but if the whole chat feature is inactive, maybe we should.
    // For now, let's keep it connected as long as the app is alive or until explicitly closed.

    return {
        messages,
        isOpen,
        isLoading,
        newMessage,
        toggleChat,
        send,
        refreshMessages,
    };
}
