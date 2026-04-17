import { onMounted, ref } from 'vue';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';
import { chatService, getSessionId, type Message } from '../services/chat-service';

// --- Supabase Client Setup ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Shared State ---
const messages = ref<Message[]>([]);
const isOpen = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
let chatChannel: RealtimeChannel | null = null; // Replaces EventSource

export function useChat() {
    const router = useRouter();

    const toggleChat = () => {
        isOpen.value = !isOpen.value;
        if (isOpen.value && messages.value.length === 0) {
            refreshMessages().then();
        }
    };

    const refreshMessages = async () => {
        const isFirstLoad = messages.value.length === 0;
        if (isFirstLoad) isLoading.value = true;

        try {
            messages.value = await chatService.fetchMessages();
        } finally {
            if (isFirstLoad) isLoading.value = false;
        }
    };

    const connectRealtime = () => {
        // Prevent multiple subscriptions
        if (chatChannel) return;

        const currentUid = getSessionId();

        // Target the same channel defined in your Edge Function
        chatChannel = supabase.channel(`chat-room-${currentUid}`);

        // 1. Listen for standard incoming messages
        chatChannel.on('broadcast', { event: 'new-msg' }, (payload) => {
            console.log('Realtime message received:', payload);
            const newMsg = payload.payload;

            // Security check: Only add the message to the UI if it belongs to this specific user
            if (newMsg.uid === currentUid) {
                const exists = messages.value.some((m) => m.id === newMsg.id);
                if (!exists) {
                    messages.value.push(newMsg);
                }
            }
        });

        // 2. Listen for the clear command
        chatChannel.on('broadcast', { event: 'clear-msgs' }, (payload) => {
            console.log('Realtime clear event received:', payload);
            const targetUid = payload.payload.uid;

            // Only wipe the chat if the [CLEAR] command targeted this specific user
            if (targetUid === currentUid) {
                messages.value = [];
            }
        });

        // 3. Listen for Smart Actions (Remote Navigation/Scroll)
        chatChannel.on('broadcast', { event: 'smart-action' }, (payload) => {
            console.log('Smart Action received:', payload);
            const { action, data, uid } = payload.payload;

            // Security: Only execute if it matches this user's UID
            if (uid !== currentUid) return;

            if (action === 'NAVIGATE' && data?.path) {
                console.info('Remote Navigation:', data.path);
                router.push(data.path).then();
            } else if (action === 'SCROLL_TO' && data?.selector) {
                console.info('Remote Scroll:', data.selector);
                const el = document.querySelector(data.selector);
                el?.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // 4. Initiate the connection
        chatChannel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('Successfully connected to Supabase Realtime');
            } else if (status === 'CHANNEL_ERROR' || status === 'CLOSED') {
                console.error('Realtime connection issue. Status:', status);
                // Note: Supabase JS client handles auto-reconnection under the hood!
            }
        });
    };

    // @ts-ignore
    const disconnectRealtime = () => {
        if (chatChannel) {
            supabase.removeChannel(chatChannel).then();
            chatChannel = null;
        }
    };

    const send = async () => {
        if (!newMessage.value.trim()) return;

        const text = newMessage.value;
        const uid = getSessionId();

        // Optimistic update: Add a message to the UI immediately
        const tempId = `temp-${Date.now()}`;
        const tempMsg: Message = {
            id: tempId,
            uid: uid,
            type: 'outgoing',
            message: text,
            timestamp: Date.now(),
        };

        messages.value.push(tempMsg);
        newMessage.value = '';

        try {
            await chatService.sendMessage(text);
            // We wait for the Realtime 'new-msg' event (if your Edge Function echoes it)
            // or just rely on the optimistic update.
        } catch (error) {
            console.error('Error sending message:', error);
            // Remove the optimistic message if the API call failed
            messages.value = messages.value.filter((m) => m.id !== tempId);
            newMessage.value = text;
        }
    };

    onMounted(() => {
        connectRealtime();
    });

    // We intentionally removed onUnmounted(() => disconnectRealtime())
    // because useChat is used in multiple components (Header, ChatBox).
    // Unmounting one would kill the connection for the entire app.

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
