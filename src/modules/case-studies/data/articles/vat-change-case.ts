import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const VAT_CHANGE_CASE_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> = {
    en: {
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: 'Back to Case Studies',
        },
        id: 'handling-a-vat-increase-in-a-legacy-real-time-system',
        systemIds: ['system-twin-v1'],
        title: 'Handling a VAT Increase in a Legacy, Real-Time System',
        heading: 'VAT Increase Handling',
        highlight:
            'Twin v1 — Managing a strict regulatory shift within a brittle legacy architecture',
        subtitle:
            'How I navigated a critical tax update in a legacy ERP riddled with hardcoded logic, protecting historical financial data without halting production.',
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Twin v1 was the operational and financial lifeblood of the distributor business. When the Indonesian government announced a VAT (PPN) increase from 10% to 11% in 2022, it wasn’t just a minor regulatory update—it was a hard deadline imposed on a system entirely ill-equipped to handle it.',
                    'I had long known the system’s tax logic was fragile, with VAT percentages hardcoded deep within the application. Given the severe legal and financial implications of getting this wrong, the mandate to handle the update came directly from the CEO. The margin for error was non-existent.',
                ],
            },
            {
                id: 'the-problem',
                label: 'The Problem',
                paragraphs: [
                    'The legacy architecture suffered from a severe structural flaw for a financial application: it didn’t persist calculated totals. Grand totals, tax amounts, and net values were never saved to the database; instead, they were recalculated dynamically "on the fly" from master data every time an invoice was viewed or a report was generated.',
                    'Because this logic was duplicated across dozens of APIs, simply updating a hardcoded `0.10` to `0.11` was out of the question. Doing so would instantly and retroactively recalculate years of historical invoices, mutating past financial reports and creating massive accounting discrepancies.',
                ],
            },
            {
                id: 'constraints',
                label: 'Constraints',
                items: [
                    'The business could not pause transactions; the fix had to be deployed while the system was live.',
                    'There was no centralized calculation service—tax logic was scattered across controllers and models.',
                    'Automated test coverage was virtually non-existent for these legacy flows.',
                    'The system relied entirely on fragile, real-time dynamic recalculation.',
                    'Due to the extreme sensitivity of the data, I had to architect and deploy the fix entirely solo.',
                    'A full structural refactor was the correct engineering answer, but completely unfeasible for a live, production-critical ERP.',
                ],
            },
            {
                id: 'decision-and-approach',
                label: 'Decision and Approach',
                paragraphs: [
                    'Accepting that a rewrite was impossible, I opted for a pragmatic, versioned tax strategy. I introduced a new `vat_percentage` column directly into the transaction tables to capture and freeze the rate at the exact moment of sale (Point-in-Time Snapshotting).',
                    "For all new transactions, the system would read from a centralized configuration file rather than hardcoded floats. Historical records were constrained to retain their original, implicitly calculated values, while new transactions utilized the injected configuration. It was a defensive measure designed to ensure the dynamic recalculation wouldn't compromise historical data integrity.",
                ],
            },
            {
                id: 'risk-management-and-verification',
                label: 'Risk Management and Verification',
                paragraphs: [
                    'To mitigate the operational risk, I built out end-to-end test suites specifically for the critical APIs. I also introduced a runtime feature flag—a defensive block that would hard-fail any transaction if the calculated VAT didn’t strictly match the legally valid rate during the rollout window.',
                    'For two weeks, I worked directly with the finance team, manually cross-verifying live reports to ensure not a single rupiah was miscalculated or retrospectively altered.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome',
                paragraphs: [
                    'We navigated the regulatory shift with zero downtime. Invoice totals remained accurate, the integrity of years of historical data was protected, and a significant legal risk was mitigated without interrupting business operations.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    "This wasn't an architectural upgrade; it did nothing to resolve Twin v1’s underlying structural debt. Lacking a centralized calculation engine meant I still had to apply repetitive, defensive patches across the API layer. It was a calculated stopgap to stabilize the system, not a long-term resolution.",
                    'However, the friction of managing dynamically recalculated financial data permanently shaped how I build software. In every system I’ve designed since—especially LAAS—pricing and tax logic are treated as immutable, versioned data. Financial state must be captured and frozen, never recomputed on the fly.',
                ],
            },
        ],
        glossary: [
            {
                term: 'Point-in-Time Snapshotting',
                definition:
                    'The practice of recording the exact state of dependent data (like tax rates or prices) at the moment a transaction occurs, ensuring the record remains accurate even if master data changes later.',
            },
            {
                term: 'Legacy System',
                definition:
                    'An outdated computer system or software that is still in use because it still performs critical business functions, despite its architectural debt.',
            },
            {
                term: 'Master Data',
                definition:
                    'The core data within an enterprise (like product catalogs or customer lists) that provides context for business transactions.',
            },
        ],
    },
    id: null,
};

export function useVatChangeCaseData() {
    const { locale } = useI18n();

    return computed<CaseStudyArticle | null>(
        () => VAT_CHANGE_CASE_BY_LOCALE[locale.value] ?? VAT_CHANGE_CASE_BY_LOCALE.en,
    );
}

export default VAT_CHANGE_CASE_BY_LOCALE.en;
