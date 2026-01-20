import { CaseStudies } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

const CASE_STUDIES_BY_LOCALE: Record<'en' | 'id', CaseStudies> = {
    en: [
        {
            id: 'twin-v1-vat',
            title: 'Handling a VAT Increase in a Legacy, Real-Time System',
            highlight: 'Twin v1 — Regulatory change under production and architectural constraints',
            description:
                'How I managed a critical regulatory update in a legacy system with hardcoded tax logic, ensuring zero downtime and data integrity.',
            link: {
                id: 'read-vat-case',
                href: '/case-studies/twin-v1/handling-a-vat-increase-in-a-legacy-real-time-system',
                label: 'Read Case Study →',
            },
        },
    ],
    id: [],
};

export function useCaseStudiesData() {
    const { locale } = useI18n();

    return computed<CaseStudies>(
        () => CASE_STUDIES_BY_LOCALE[locale.value] ?? CASE_STUDIES_BY_LOCALE.en,
    );
}

export default CASE_STUDIES_BY_LOCALE.en;
