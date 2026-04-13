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
        title: 'Handling a VAT Increase in a Legacy Real-Time System',
        heading: 'VAT Increase Handling',
        highlight:
            'Twin v1 — Managing a strict regulatory shift within a brittle legacy architecture',
        subtitle:
            'Implementing a versioned tax strategy to meet mandatory regulatory shifts, protecting historical financial data from the risks of dynamic calculation in a legacy architecture.',
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Twin v1 served as the core operational system for the distributor business. In 2022, the Indonesian government increased VAT from `10%` to `11%`, requiring a system-wide update to our financial logic. While the system had been functionally stable for years, this regulatory shift exposed deep-seated architectural debt in how we handled tax calculations.',
                ],
            },
            {
                id: 'the-problem',
                label: 'The Problem',
                paragraphs: [
                    'The legacy architecture lacked temporal awareness and data persistence for financial totals. Grand totals and tax amounts were never saved to the database; instead, they were recalculated dynamically "on the fly" every time an invoice was viewed or a report was generated.',
                    "This logic was decentralized, with the VAT percentage hardcoded as `0.10` magic numbers directly within dozens of API controllers. Because calculations were performed in real-time rather than persisted at the point of sale, a simple update to `11%` would have triggered a retroactive mutation of every historical invoice. We couldn't comply with the new regulation without simultaneously corrupting years of past financial records.",
                ],
            },
            {
                id: 'constraints',
                label: 'Constraints',
                items: [
                    '`Zero Downtime Requirement`: The business could not pause transactions; the solution had to be deployed and verified while the system was live and processing orders.',
                    '`Architectural Rigidity`: The lack of a centralized calculation service made a full structural refactor unfeasible within the regulatory deadline. Stability and risk mitigation took precedence over architectural purity.',
                    '`Testing Deficit`: Automated test coverage was virtually non-existent for these legacy flows, providing no safety net for changes to critical financial logic.',
                    '`Strict Data Security`: Given the sensitivity of the financial records and the legal implications of the update, the design and rollout were conducted under highly restricted access, necessitating a siloed execution.',
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
        qnas: [
            {
                question: 'Why not backfill historical totals with a one-time data migration?',
                answer: 'Mass migration in a test-less legacy environment carried unacceptable risk. A "do no harm" strategy was the most reliable path to compliance, avoiding the compute overhead and potential corruption risks of backfilling millions of rows for a purely regulatory shift.',
            },
            {
                question:
                    'Did adding a `vat_percentage` column create significant database overhead?',
                answer: 'The storage overhead was negligible compared to the gain in auditability. Trading a few bytes per row for an `immutable snapshot` replaced unreliable date-based inference with 100% financial accuracy, a high-ROI trade-off for any financial system.',
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
            {
                term: 'Architectural Debt',
                definition:
                    'The long-term cost of choosing an easy or "quick-fix" solution now instead of using a better approach that would take longer to implement.',
            },
            {
                term: 'Temporal Awareness',
                definition:
                    "A system's ability to track and process data based on when it occurred in time, rather than only knowing the 'current' state of the data.",
            },
            {
                term: 'Magic Numbers',
                definition:
                    'Unique values—like the 0.10 tax rate—hardcoded directly into source code without explanation, making them difficult to locate and update safely.',
            },
            {
                term: 'Retroactive Mutation',
                definition:
                    'An unintended change to historical records caused by updating logic or configurations that the system applies to both new and old data indiscriminately.',
            },
            {
                term: 'Feature Flag',
                definition:
                    'A technical toggle that allows functionality to be turned on or off at runtime, providing a safety net to disable new logic instantly if it causes production issues.',
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
