import { computed } from 'vue';
import { language } from '@/store';

export function useI18n() {
    const locale = computed<'en' | 'id'>(() => {
        const current = language.value.toLowerCase();
        return current.startsWith('id') ? 'id' : 'en';
    });

    return { locale };
}
