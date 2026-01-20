import { computed } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { Skills } from '@/modules/skills/skills.types.ts';

const SKILLS_BY_LOCALE: Record<'en' | 'id', Skills> = {
    en: {
        title: 'Skills',
        description: 'This page is under construction.',
    },
    id: {
        title: 'Keahlian',
        description: 'Halaman ini sedang dalam pengembangan.',
    },
};

export function useSkillsData() {
    const { locale } = useI18n();

    return computed<Skills>(() => SKILLS_BY_LOCALE[locale.value] ?? SKILLS_BY_LOCALE.en);
}

export default SKILLS_BY_LOCALE.en;
