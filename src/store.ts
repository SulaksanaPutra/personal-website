import { ref } from 'vue';

const getInitialLanguage = (): string => {
    if (typeof window === 'undefined') {
        return 'EN';
    }

    const stored = window.localStorage.getItem('language');

    if (stored === 'EN' || stored === 'ID') {
        return stored;
    }

    return 'EN';
};

export const isDark = ref(false);
export const language = ref(getInitialLanguage());
export const isDrawerOpen = ref(false);
export const scrollProgress = ref(0);
export const activeSection = ref('');
export const headerComponentRef = ref<{ headerRef: HTMLElement | null } | null>(null);
export const isDrawerEmpty = ref(true);
export const isEditorActive = ref(import.meta.env.DEV);
