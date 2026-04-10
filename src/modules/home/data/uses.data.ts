import { computed } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { UsesCategory } from '@/modules/home/types/uses.types.ts';

const USES_BY_LOCALE: Record<'en' | 'id', UsesCategory> = {
    en: {
        title: 'Uses',
        descriptions: [
            'A curated list of tools and hardware optimized for focus and architectural delivery.',
        ],
        groups: [
            {
                label: 'Development Environment',
                items: [
                    'Primary IDE: JetBrains Ecosystem (GoLand, PHPStorm, WebStorm, DataGrip)',
                    'Hardware: MacBook (macOS) / Linux for production parity',
                    'Terminal: Zsh with minimalist configuration for portability',
                    'Font: JetBrains Mono',
                ],
            },
            {
                label: 'Collaboration & Tools',
                items: [
                    'Communication: Slack, Microsoft Teams, and Discord',
                    'Productivity: Jira and Confluence for workflow management',
                    'AI: Tool-agnostic approach (Claude, Cursor, OpenAI)',
                ],
            },
        ],
        glossary: [
            {
                term: 'JetBrains Ecosystem',
                definition:
                    'A suite of specialized IDEs that provide deep static analysis and "batteries-included" tooling, reducing time spent on workspace configuration.',
            },
            {
                term: 'Zsh',
                definition:
                    'A shell designed for interactive use, used here with a focus on speed and standard compatibility.',
            },
            {
                term: 'Tool-agnostic',
                definition:
                    'The practice of choosing software based on specific task efficiency rather than loyalty to a single brand or ecosystem.',
            },
        ],
    },
    id: {
        title: 'Peralatan',
        descriptions: [
            'Daftar peralatan dan perangkat lunak yang dikurasi untuk fokus dan efisiensi arsitektural.',
        ],
        groups: [
            {
                label: 'Lingkungan Pengembangan',
                items: [
                    'IDE Utama: Ekosistem JetBrains (GoLand, PHPStorm, WebStorm, DataGrip)',
                    'Perangkat Keras: MacBook (macOS) / Linux untuk kesamaan lingkungan produksi',
                    'Terminal: Zsh dengan konfigurasi minimalis untuk portabilitas',
                    'Font: JetBrains Mono',
                ],
            },
            {
                label: 'Kolaborasi & Alat',
                items: [
                    'Komunikasi: Slack, Microsoft Teams, dan Discord',
                    'Produktivitas: Jira dan Confluence untuk manajemen alur kerja',
                    'AI: Pendekatan Tool-agnostic (Claude, Cursor, OpenAI)',
                ],
            },
        ],
        glossary: [
            {
                term: 'Ekosistem JetBrains',
                definition:
                    'Rangkaian IDE khusus yang menyediakan analisis statis mendalam dan fitur lengkap, mengurangi waktu untuk konfigurasi workspace.',
            },
            {
                term: 'Zsh',
                definition:
                    'Shell yang dirancang untuk penggunaan interaktif, digunakan di sini dengan fokus pada kecepatan dan kompatibilitas standar.',
            },
            {
                term: 'Tool-agnostic',
                definition:
                    'Praktik memilih perangkat lunak berdasarkan efisiensi tugas tertentu daripada loyalitas pada satu merek atau ekosistem.',
            },
        ],
    },
};

export function useUsesData() {
    const { locale } = useI18n();

    return computed<UsesCategory>(() => USES_BY_LOCALE[locale.value] ?? USES_BY_LOCALE.en);
}

export default USES_BY_LOCALE.en;
