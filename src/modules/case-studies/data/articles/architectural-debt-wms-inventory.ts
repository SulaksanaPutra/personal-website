import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const TWIN_WMS_STOCK_CASE_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> = {
    en: {
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: 'Back to Case Studies',
        },
        id: 'architectural-debt-wms-inventory',
        systemIds: ['system-twin-v2-wms'],
        title: 'Architectural Debt: Inventory Ledgers and Physical Constraints',
        heading: 'Architectural Debt: Inventory Ledgers',
        highlight:
            'Twin v1 & Twin v2 WMS — Solving ghost stock and race conditions by transitioning to an append-only transaction architecture.',
        subtitle:
            'How we replaced a flawed dynamic stock calculator with a strict transactional ledger to stabilize warehouse operations and reconcile logical data with physical reality.',
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Twin v1 was a monolithic ERP that struggled to maintain accurate inventory across 8 warehouse locations and 500+ SKUs. The core issue was a fundamental misunderstanding of inventory state: the system lacked a transactional ledger. Instead, it relied on daily stock "snapshots" and a heavily queried dynamic table to calculate available stock on the fly.',
                    'Because the calculation logic was decentralized—spread across various controllers and services—it was nearly impossible to maintain a single source of truth. The resulting race conditions meant the stock numbers in the system rarely matched the physical reality on the warehouse floor.',
                ],
            },
            {
                id: 'problem',
                label: 'Problem',
                paragraphs: [
                    'The most visible failure occurred during order modifications. In Twin v1, when an admin edited an approved order—even for non-inventory changes like adjusting a discount—the system would fully rollback the stock allocation to the available pool.',
                    'In a high-volume environment, this created a race condition. While Order A was being edited, its "released" stock would be instantly claimed by a new Order B. When the admin tried to re-approve Order A, the system would throw an `insufficient stock` error. This forced admins into a manual cycle of canceling other orders just to fulfill original requirements, leading to widespread operational distrust.',
                ],
            },
            {
                id: 'constraints',
                label: 'Constraints',
                paragraphs: [
                    'The legacy codebase in Twin v1 was too entangled to refactor safely without risking the entire distribution flow. The logic was fragile, and automated test coverage was insufficient for a high-stakes rewrite of the core inventory engine.',
                    'The only pragmatic path was to isolate the inventory logic into a standalone service: Twin v2 WMS. This allowed us to define a new, strict data model without being hindered by the monolith’s existing technical debt.',
                ],
            },
            {
                id: 'solution',
                label: 'Solution',
                paragraphs: [
                    'For Twin v2, we shifted to an immutable state model. Every inbound shipment created a distinct inventory batch. Instead of updating a single `total_stock` integer, every movement (allocation, picking, adjustment) was recorded as an append-only transaction in a ledger.',
                    '',
                    'We implemented a "chain pattern" for stock history, where each record validated the previous state to ensure the ledger couldn\'t be silently altered. We also replaced the hardcoded two-unit limit with a dynamic Unit of Measure (`UOM`) system, using converters to translate between bulk containers and individual pieces.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome',
                paragraphs: [
                    'Technically, the ledger was a success. Accuracy against physical audits rose to 98%. But in software engineering, solving the math is often the easy part; the real challenge is surviving the gap between a digital system and physical operations. The `WMS` was built to be the single source of truth, yet it ended up with a regrettable blocker regarding "real" physical stock.',
                    'The system effectively tracked "virtual stock"—what was booked or reserved. To mirror actual physical outbound movement, we developed a dedicated mobile app for field workers, but it never fully achieved successful implementation in the real field. The information happening on the warehouse floor was never truly mirrored in the system, leaving the `WMS` blind to the final step of the supply chain.',
                    '',
                    'We could have used `Twin v1` order data as a proxy for stock leaving the warehouse, but that data isn\'t truly real-time; "customer received" status includes a delivery lag that makes it unreliable for immediate warehouse management. Furthermore, `Twin v2` was designed as a standalone SaaS "miniservice" rather than an integrated microservice. Its design principle was to manage warehouse data exclusively and act as a data provider, not to reach out and pull order data from other applications.',
                    'This led to a hollow compromise: we had a perfect ledger that knew exactly what *should* be in the warehouse, but no way of knowing what had actually *left*. We were forced to extract data from the `WMS` and manually merge it with `v1` order data in external reports. Management was satisfied with the accurate reports, but as an architect, it was deeply frustrating. We had built a system to solve the inventory problem, only to see its most critical features remain functionally blind due to operational reality and the "good enough" nature of external reporting.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    'This project taught me that stock is a time-series problem, not a simple relational one. If I were to rebuild this today, I would eliminate the "temporary final stock" tables entirely. I would rely exclusively on an indexed, append-only transaction table where the latest row represents the current state. This removes the risk of "state contamination" between the ledger and a summary table.',
                    'I also learned that `UOM` complexity is better handled by storing everything in the smallest base unit and applying a `Packaging Factor` only at the point of transaction. It reduces relational overhead and makes the system much more resilient to changes in how items are packaged.',
                ],
            },
        ],
        glossary: [
            {
                term: 'Append-Only Ledger',
                definition:
                    'A data pattern where records are only added, never updated. This provides an immutable audit trail of every change that has ever happened to a value.',
            },
            {
                term: 'Unit of Measure (UOM)',
                definition:
                    'The standard units used to quantify an item (e.g., Box, Pack, Piece). Managing conversions between these units is a core challenge in warehouse systems.',
            },
            {
                term: 'Packaging Factor',
                definition:
                    'A numeric multiplier used to calculate the quantity of a base unit within a larger container (e.g., a Box with a factor of 12 contains 12 Pieces).',
            },
        ],
        qnas: [
            {
                question: 'Why not sync order data from v1 back to v2 for real-time tracking?',
                answer: 'I proposed flagging Twin v1 order data as "real stock out" and feeding it back into the WMS. However, management rejected it. It required a bi-directional sync that felt redundant since we "already had" the (unused) mobile app. Ultimately, the business was content with joining the data in a report rather than fixing the system architecture.',
            },
        ],
    },
    id: null,
};

export function useTwinWmsStockCaseData() {
    const { locale } = useI18n();

    return computed<CaseStudyArticle | null>(
        () => TWIN_WMS_STOCK_CASE_BY_LOCALE[locale.value] ?? TWIN_WMS_STOCK_CASE_BY_LOCALE.en,
    );
}

export default TWIN_WMS_STOCK_CASE_BY_LOCALE.en;
