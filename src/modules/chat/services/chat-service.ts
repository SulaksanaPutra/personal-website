const ID_KEY = 'chat_session_id';
const BASE_URL = import.meta.env.VITE_CHAT_BASE_URL;

export const getSessionId = () => {
    let id = localStorage.getItem(ID_KEY);
    if (!id) {
        // Generate an 8-character lowercase alphanumeric ID
        id = Math.random().toString(36).substring(2, 10);
        localStorage.setItem(ID_KEY, id);
    }
    return id;
};

export interface Message {
    id: string;
    uid: string;
    direction: 'outgoing' | 'incoming';
    message: string;
    timestamp: number;
}

export const chatService = {
    async fetchMessages(): Promise<Message[]> {
        const uid = getSessionId();
        try {
            const response = await fetch(`${BASE_URL}/messages`, {
                headers: {
                    'x-uid': uid
                }
            });
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            return data.messages || [];
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            return [];
        }
    },

    async sendMessage(message: string): Promise<void> {
        const uid = getSessionId();
        try {
            const response = await fetch(`${BASE_URL}/send`, {
                method: 'POST',
                headers: {
                    'x-uid': uid,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            if (!response.ok) throw new Error('Failed to send message');
        } catch (error) {
            console.error('Failed to send message:', error);
            throw error;
        }
    },

    getSSEUrl(): string {
        const uid = getSessionId();
        return `${BASE_URL}/events?uid=${uid}`;
    }
};
