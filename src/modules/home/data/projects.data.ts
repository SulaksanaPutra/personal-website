import { computed } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { Projects } from '@/modules/home/types/projects.types.ts';

const PROJECTS_BY_LOCALE: Record<'en' | 'id', Projects> = {
    en: {
        title: 'Projects',
        descriptions: [
            "A collection of short ideas, experiments, and drafts. These are projects that I've worked on to explore new technologies or to solve specific problems.",
        ],
    },
    id: {
        title: 'Proyek',
        descriptions: [
            'Kumpulan ide singkat, eksperimen, dan draf. Ini adalah proyek yang saya kerjakan untuk mengeksplorasi teknologi baru atau menyelesaikan masalah tertentu.',
        ],
    },
};

export function useProjectsData() {
    const { locale } = useI18n();

    return computed<Projects>(() => PROJECTS_BY_LOCALE[locale.value] ?? PROJECTS_BY_LOCALE.en);
}

export default PROJECTS_BY_LOCALE.en;
