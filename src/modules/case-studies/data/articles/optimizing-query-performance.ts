import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const OPTIMIZING_QUERY_PERFORMANCE_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> =
{
    en: {
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: 'Back to Case Studies',
        },
        id: 'optimizing-query-performance-in-a-monolithic-erp',
        systemIds: ['system-twin-v1'],
        title: 'Optimizing Query Performance in a Monolithic ERP',
        heading: 'Optimizing Query Performance',
        highlight:
            'Stabilizing a monolithic Laravel ERP by untangling lazy loading and N+1 queries—a pragmatic exercise in treating symptoms without breaking production.',
        subtitle:
            "How we bought time for a strained ERP system by addressing lazy loading and read/write contention, accepting the harsh reality that a full architectural rewrite wasn't an option.",
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Twin v1 was a massive, monolithic ERP that grew organically—and painfully—over time. Originally designed strictly for operational flows like sales, warehouse management, and delivery, it was eventually forced to support heavy analytical reporting. Because reporting was never part of the original blueprint, transactional tables—most notably the core orders table—were queried directly for analytics.',
                    'It worked well enough in the early days, but as the data volume swelled and features expanded, the system began to collapse under its own weight.',
                ],
            },
            {
                id: 'the-problem',
                label: 'The Problem',
                paragraphs: [
                    'After roughly two years of accumulating live data, the performance degradation was impossible to ignore. The root cause was a classic, compounding architectural flaw: lazy loading and the N+1 query problem, heavily exacerbated by the reporting features. We had a single "god model" for Orders that served transactions, simple reads, and complex reports simultaneously.',
                    '',
                    'Over time, developers had piled more and more query logic onto this single model. Convenience abstractions like Laravel’s pagination turned into silent killers, as the underlying COUNT queries became agonizingly expensive on millions of rows.',
                    'Furthermore, with no data cutoff or archiving strategy, reports were crunching years of live transaction history in real-time. The system was trying to sprint while dragging a massive anchor of historical data.',
                ],
            },
            {
                id: 'impact',
                label: 'Impact',
                paragraphs: [
                    'The user experience degraded into slow page loads, constant request timeouts, and reports that simply hung forever. As the reporting traffic grew, it started choking the core operational flows. Database connections pooled up, expensive queries deadlocked, and the database server crashed multiple times under the strain.',
                    'At this stage, performance was no longer a minor UX complaint; it had become an existential threat to daily business operations.',
                ],
            },
            {
                id: 'constraints',
                label: 'Constraints',
                paragraphs: [
                    "The most frustrating constraint was reality: a full architectural rewrite was completely off the table. The system was simply too large and too deeply embedded in the company's daily operations. Touching the write logic was entirely too risky, as it governed the core business transactions that kept the lights on. We were forced to work within the confines of an architecture we knew was fundamentally flawed.",
                ],
            },
            {
                id: 'decision-and-approach',
                label: 'Decision and Approach',
                paragraphs: [
                    "Working alongside my tech lead and manager, we accepted that structural redesign wasn't an option. Instead, we chose a tactical retreat, focusing entirely on read optimization to stop the bleeding.",
                    'The main steps were:',
                ],
                items: [
                    'Stripping reporting logic out of Eloquent models and replacing it with raw SQL and query builders.',
                    'Aggressively reducing lazy loading in reporting paths and enforcing explicit joins.',
                    'Ripping out standard pagination in favor of simple LIMIT queries where total counts weren’t strictly required.',
                    'Applying targeted database indexes (though we knew this would have limited impact on its own).',
                    'Introducing a master-slave database replication to physically separate read-heavy reporting from write-heavy operations.',
                    'Deploying behind feature flags and temporarily disabling the heaviest reports until they could be stabilized.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome',
                paragraphs: [
                    '',
                    'The tactical patch worked. Load times dropped significantly, memory usage stabilized, and the database stopped crashing. Reporting queries were no longer taking down operational traffic, and the day-to-day system became reliable again.',
                    'However, I was acutely aware that we hadn’t cured the disease; we only treated the symptoms. The underlying data model and the fragile write logic remained untouched. Without a true archiving mechanism, the system was simply on a slower, albeit delayed, path toward the exact same bottleneck.',
                    'In the end, this work felt less like an engineering victory and more like buying time. We defused the immediate bomb, but the architectural debt was still sitting quietly in the basement.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    'Initially, the frustration of this project made me want to abandon ORMs entirely in favor of raw queries and strict repository layers. But over time, I realized the ORM wasn’t the enemy—the lack of architectural boundaries was. ORMs are fantastic for transactional logic, but they do not scale automatically when you force them to handle heavy analytical reporting. Convenience features like lazy loading are loans with high interest rates; eventually, the technical debt comes due.',
                    'Since Twin v1, I’ve become highly intentional about separating read and write paths, defaulting to query-based approaches for reporting, and planning for data archiving on day one. It was a painful lesson, but it fundamentally changed how I approach system longevity.',
                ],
            },
        ],
        qnas: [
            {
                question:
                    "Why didn't you just use a dedicated Data Warehouse (like `BigQuery` or `ClickHouse`) for the reporting?",
                answer: 'We were actually in the process of doing exactly that. We had hired specialists and started building the ETL pipelines, but you can’t build a skyscraper while the ground is shaking. The system was crashing now. A Data Warehouse is a long-term cure, but we needed a tourniquet to stop the immediate bleeding. The Master-Slave replication was a tactical move—it was the fastest way to physically isolate the "reporting" fire from the "transactional" core without a total rewrite. In the end, the company’s trajectory shifted before the "perfect" architecture could be finished, leaving us with a half-baked but stable solution.',
            },
        ],
    },
    id: null,
};

export function useOptimizingQueryPerformanceData() {
    const { locale } = useI18n();

    return computed<CaseStudyArticle | null>(
        () =>
            OPTIMIZING_QUERY_PERFORMANCE_BY_LOCALE[locale.value] ??
            OPTIMIZING_QUERY_PERFORMANCE_BY_LOCALE.en,
    );
}

export default OPTIMIZING_QUERY_PERFORMANCE_BY_LOCALE.en;
