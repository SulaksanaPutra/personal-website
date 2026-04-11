import { Header } from '@/core/types/header.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';
import { SYSTEMS_BY_LOCALE } from '@/modules/systems/data/systems.data.ts';
import { CASE_STUDIES_BY_LOCALE } from '@/modules/case-studies/data/case-studies.data.ts';

const HEADER_BY_LOCALE: Record<'en' | 'id', Header> = {
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
                description: 'Deep dives into real-world projects',
            },
            {
                id: 'skillsPage',
                label: 'Skills',
                href: '/skills',
                description: 'Technical stack and core competencies',
            },
            {
                id: 'contactPage',
                label: 'Contact',
                href: '/contact',
                description: 'What I am currently focused on',
            },
        ],
        navigations: [
            { id: 'home', label: 'Home', href: '/', hiddenOnMd: false },
            { id: 'systemsPage', label: 'Systems', href: '/systems', hiddenOnMd: false },
            { id: 'case-studies', label: 'Case Studies', href: '/case-studies', hiddenOnMd: true },
            { id: 'skillsPage', label: 'Skills', href: '/skills', hiddenOnMd: false },
            { id: 'contactPage', label: 'Contact', href: '/contact', hiddenOnMd: false },
        ],
    },
    id: {
        searchLinks: [
            {
                id: 'home',
                label: 'Beranda',
                href: '/',
                description: 'Ringkasan dan pendahuluan',
            },
            {
                id: 'systemsPage',
                label: 'Sistem',
                href: '/systems',
                description: 'Arsitektur, pola, dan catatan desain sistem',
            },
            {
                id: 'case-studies',
                label: 'Studi Kasus',
                href: '/case-studies',
                description: 'Eksplorasi mendalam proyek dunia nyata',
            },
            {
                id: 'skillsPage',
                label: 'Keahlian',
                href: '/skills',
                description: 'Teknologi dan kompetensi inti',
            },
            {
                id: 'contactPage',
                label: 'Kontak',
                href: '/contact',
                description: 'Fokus saya saat ini',
            },
        ],
        navigations: [
            { id: 'home', label: 'Beranda', href: '/', hiddenOnMd: false },
            { id: 'systemsPage', label: 'Sistem', href: '/systems', hiddenOnMd: false },
            { id: 'case-studies', label: 'Studi Kasus', href: '/case-studies', hiddenOnMd: true },
            { id: 'skillsPage', label: 'Keahlian', href: '/skills', hiddenOnMd: false },
            { id: 'contactPage', label: 'Kontak', href: '/contact', hiddenOnMd: false },
        ],
    },
};

export function useHeaderData() {
    const { locale } = useI18n();

    return computed<Header | null>(() => {
        // Step 1: Get the current locale or fallback to English
        const data = HEADER_BY_LOCALE[locale.value] || HEADER_BY_LOCALE.en;

        // Step 2: Content Availability Filtering
        // Menus are no longer filtered; language fallback UI is handled directly within the page views.
        return data;
    });
}

export default HEADER_BY_LOCALE.en;
