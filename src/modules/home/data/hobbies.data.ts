import { computed } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { Hobbies } from '@/modules/home/types/hobbies.types.ts';

const HOBBIES_BY_LOCALE: Record<'en' | 'id', Hobbies> = {
    en: {
        title: 'Hobbies',
        descriptions: ['What I enjoy doing'],
        items: [],
    },
    id: {
        title: 'Hobi',
        descriptions: ['Hal-hal yang saya nikmati'],
        items: [],
    },
};

export function useHobbiesData() {
    const { locale } = useI18n();

    return computed<Hobbies>(() => HOBBIES_BY_LOCALE[locale.value] ?? HOBBIES_BY_LOCALE.en);
}

export default HOBBIES_BY_LOCALE.en;
