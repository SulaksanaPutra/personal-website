import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const TWIN_FMS_ROUTING_CASE_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> = {
    en: {
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: 'Back to Case Studies',
        },
        id: 'fms-uom-routing-abstraction',
        systemIds: ['system-twin-v2-fms'],
        title: 'The Friction of Units: Bridging Physical Habits and Digital Logic',
        heading: 'The Friction of Units',
        highlight:
            'Twin FMS — Navigating the conflict between standardized volumetric routing and entrenched "box-based" business habits.',
        subtitle:
            'How we implemented a virtual UOM abstraction and metadata-driven prioritization to automate delivery scheduling without breaking the existing business model.',
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Twin FMS was designed as a SaaS-oriented miniservice to decouple delivery management from the legacy Twin v1 monolith. The objective was precision: once an order was loaded by the warehouse, the FMS would take over to manage the "last mile"—scheduling which orders went on which vehicles and in what sequence.',
                    'The vision was to build a semi-automated routing engine. We wanted to move away from manual dispatching toward a system that could calculate vehicle capacity and enforce First-In-First-Out (FIFO) logic with mathematical certainty.',
                ],
            },
            {
                id: 'problem',
                label: 'Problem',
                paragraphs: [
                    'To achieve automation, a routing engine requires rigid, calculable parameters like volume (m³) and weight (kg). However, we hit an immediate wall with operational habits. For decades, the business had operated using "Boxes" and "Pieces" as their primary units of measure (UOM).',
                    'While a "Box" sounds like a unit, it is physically inconsistent—a box of tissue and a box of canned goods have vastly different footprints. Furthermore, the business insisted on using "Product Value" to determine delivery priority. From an architectural standpoint, injecting sales data (financial value) into a specialized delivery service felt like domain contamination. An FMS should be "price-blind"; it should care about the physical dimensions of the cargo, not the invoice total.',
                ],
            },
            {
                id: 'constraints',
                label: 'Constraints',
                paragraphs: [
                    'The business model was unmovable. Management refused to transition to volumetric measurements because "Boxes" were the language spoken by every driver and dispatcher in the field. If we forced a change to m³, we risked a total breakdown in communication between the office and the loading dock.',
                    'At the same time, we had to maintain the modular integrity of the FMS. As a SaaS product, it needed to remain decoupled from the sales modules of other systems, meaning we could not directly store or process financial data within the delivery logic.',
                ],
            },
            {
                id: 'solution',
                label: 'Solution',
                paragraphs: [
                    'As a Senior Developer, I realized that fighting tribal knowledge was a losing battle. Instead, I designed a layer of abstraction. We introduced "Custom Calculable UOMs." We allowed the system to keep the term "Box," but required each product to be mapped to a decimal-equivalent of a "Standard Box." This allowed the engine to perform the math in the background while the UI remained in a language the users understood.',
                    'To solve the prioritization issue without contaminating the domain, we implemented a "Priority Flag" system. Instead of the FMS knowing the price of an order, the Sales system would calculate urgency and simply pass a metadata label (e.g., High, Medium, Low) to the FMS. This kept the service modular and focused strictly on logistics.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome',
                paragraphs: [
                    'This compromise successfully removed the biggest blocker to our automation goals. We achieved a high-precision routing schedule that could finally predict vehicle capacity with minimal error. The frequent "schedule revisions" and manual overrides that plagued the manual system were significantly reduced.',
                    'Technically, we preserved the "miniservice" vision. The FMS remained a clean, sellable product that handled delivery logic without being tethered to the specific financial rules of the parent company.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    'Even today, I find using "Boxes" as a routing parameter to be technically offensive, but I have learned that software engineering is often the art of negotiating with human habit. Forcing a "correct" technical unit like m³ on a workforce that thinks in "Boxes" doesn\'t result in better data—it results in a system that people find ways to bypass.',
                    'My role shifted from being a pure coder to a translator—finding the "best-fit" solution that respected the architectural vision while acknowledging the messy, unmovable reality of the business process.',
                ],
            },
        ],
        glossary: [
            {
                term: 'Routing Engine',
                definition:
                    'An algorithm or service used to determine the most efficient sequence of stops and vehicle allocations for a set of deliveries.',
            },
            {
                term: 'UOM Abstraction',
                definition:
                    'A technique where non-standard units (like "Boxes") are mapped to a calculable numerical value to allow for mathematical processing without changing the user-facing terminology.',
            },
            {
                term: 'Domain Contamination',
                definition:
                    'When logic or data from one business area (like Sales/Finance) leaks into a service designed for a different area (like Logistics), making the system harder to maintain and decouple.',
            },
        ],
        qnas: [
            {
                question:
                    'How did you handle products that were significantly larger or smaller than a standard box?',
                answer: 'We used a decimal mapping system. If a standard box was 1.0, a larger item might be registered as 2.5 "Box-Units." This allowed us to keep the math consistent for the routing engine while letting the users keep their familiar terminology.',
            },
        ],
    },
    id: null,
};

export function useTwinFmsRoutingCaseData() {
    const { locale } = useI18n();

    return computed<CaseStudyArticle | null>(
        () => TWIN_FMS_ROUTING_CASE_BY_LOCALE[locale.value] ?? TWIN_FMS_ROUTING_CASE_BY_LOCALE.en,
    );
}

export default TWIN_FMS_ROUTING_CASE_BY_LOCALE.en;
