import { computed } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { Uses } from '@/modules/home/types/uses.types.ts';

const USES_BY_LOCALE: Record<'en' | 'id', Uses> = {
    en: {
        title: 'Uses',
        descriptions: ['A list of tools, hardware, and software that I use on a daily basis.'],
        items: [
            'Editor: VS Code / IntelliJ IDEA',
            'Terminal: iTerm2 / Warp',
            'Font: JetBrains Mono',
        ],
        glossary: [
            {
                term: 'VS Code',
                definition: 'A highly extensible code editor developed by Microsoft.',
            },
            {
                term: 'iTerm2',
                definition: 'A power-user terminal replacement for the default macOS Terminal.',
            },
        ],
    },
    id: {
        title: 'Peralatan',
        descriptions: [
            'Daftar alat, perangkat keras, dan perangkat lunak yang saya gunakan sehari-hari.',
        ],
        items: [
            'Editor: VS Code / IntelliJ IDEA',
            'Terminal: iTerm2 / Warp',
            'Font: JetBrains Mono',
        ],
        glossary: [
            {
                term: 'VS Code',
                definition: 'Editor kode yang sangat ekstensibel yang dikembangkan oleh Microsoft.',
            },
            {
                term: 'iTerm2',
                definition: 'Pengganti terminal bawaan macOS yang kaya fitur.',
            },
        ],
    },
};

export function useUsesData() {
    const { locale } = useI18n();

    return computed<Uses>(() => USES_BY_LOCALE[locale.value] ?? USES_BY_LOCALE.en);
}

export default USES_BY_LOCALE.en;
