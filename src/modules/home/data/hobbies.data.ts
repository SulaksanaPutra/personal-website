import { computed } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { Hobbies } from '@/modules/home/types/hobbies.types.ts';

const HOBBIES_BY_LOCALE: Record<'en' | 'id', Hobbies> = {
    en: {
        title: 'Hobbies',
        descriptions: [
            'What I enjoy doing',
            'I often find myself building small, hyper-specific tools for my own use—simple browser extensions, mobile automations, or internal web apps designed to solve a bit of personal friction. I treat these projects as a way to explore new patterns or simply make my daily routine more efficient.',
            "When I’m not at my desk, I tend to keep things low-key. I enjoy novels, comics, and the occasional anime, usually i prefer 'popcorn' or lighthearted stories—narratives that are engaging enough to be a good break, but not so heavy that they linger or affect my focus.",
            'To maintain a baseline of productivity and manage stress, I keep a casual gym routine. It’s a simple way to burn off energy and avoid burnout.',
        ],
    },
    id: {
        title: 'Hobi',
        descriptions: ['Hal-hal yang saya nikmati'],
    },
};

export function useHobbiesData() {
    const { locale } = useI18n();

    return computed<Hobbies>(() => HOBBIES_BY_LOCALE[locale.value] ?? HOBBIES_BY_LOCALE.en);
}

export default HOBBIES_BY_LOCALE.en;
