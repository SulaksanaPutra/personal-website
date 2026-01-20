import { Header } from '@/core/types/header.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

const HEADER_BY_LOCALE: Record<'en' | 'id', Header | null> = {
    en: {
        searchLinks: [
            {
                id: 'home',
                label: 'Home',
                href: '/',
                description: 'Overview and introduction',
            },
            {
                id: 'systemsPage',
                label: 'Systems',
                href: '/systems',
                description: 'Architecture, patterns, and system design notes',
            },
            {
                id: 'case-studies',
                label: 'Case Studies',
                href: '/case-studies',
                description: 'Deep dives into real-world projectsPage',
            },
            {
                id: 'skillsPage',
                label: 'Skills',
                href: '/skillsPage',
                description: 'Technical stack and core competencies',
            },
            {
                id: 'contactPage',
                label: 'Contact',
                href: '/contactPage',
                description: 'What I am currently focused on',
            },
        ],
        navigations: [
            {
                id: 'home',
                label: 'Home',
                href: '/',
                hiddenOnMd: false,
            },
            {
                id: 'systemsPage',
                label: 'Systems',
                href: '/systems',
                hiddenOnMd: false,
            },
            {
                id: 'case-studies',
                label: 'Case Studies',
                href: '/case-studies',
                hiddenOnMd: true,
            },
            {
                id: 'skillsPage',
                label: 'Skills',
                href: '/skillsPage',
                hiddenOnMd: false,
            },
            {
                id: 'contactPage',
                label: 'Contact',
                href: '/contactPage',
                hiddenOnMd: false,
            },
        ],
    },
    id: null,
};

export function useHeaderData() {
    const { locale } = useI18n();

    return computed<Header | null>(() => HEADER_BY_LOCALE[locale.value] ?? HEADER_BY_LOCALE.en);
}

export default HEADER_BY_LOCALE.en;
