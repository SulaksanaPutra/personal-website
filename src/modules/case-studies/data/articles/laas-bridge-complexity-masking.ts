import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const LAAS_BRIDGE_CASE_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> = {
    en: {
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: 'Back to Case Studies',
        },
        id: 'laas-bridge-complexity-masking',
        systemIds: ['system-laas'],
        title: 'The LaaS Bridge: Abstracting Logistics Complexity',
        heading: 'The LaaS Bridge',
        highlight:
            'LaaS App — Transforming complex internal WMS/FMS engines into a user-friendly service platform via a "Command and Control" Laravel architecture.',
        subtitle:
            'How we built a standalone masking layer to pivot from selling software to selling services, and the reality of launching just before a corporate collapse.',
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Our organization already possessed robust internal Warehouse (WMS) and Fleet (FMS) management systems. However, these were designed for internal efficiency and specialized operators, not for external customers. To expand the market, the business decided to pivot from a SaaS model to a Logistics-as-a-Service (LaaS) model, allowing end-users to "rent" warehouse space and delivery services directly.',
                    'As the Senior Developer and Team Lead, I led a small team of three to architect a standalone client-side application. The goal was to create a "masking layer" that provided a simplified interface for users while acting as a bridge to the complex logistics engines running in the background.',
                ],
            },
            {
                id: 'problem',
                label: 'Problem',
                paragraphs: [
                    'The existing systems presented a "Technical Wall." Asking a casual business partner to navigate an enterprise-grade WMS was a recipe for churn. We needed a system that could simplify logistics terminology and workflows, protect internal data from "dirty" external input, and maintain the flexibility to trigger complex cross-system sequences (like WMS inbound followed by FMS outbound) in a single user action.',
                    'Furthermore, the app had to be designed as a standalone "Command and Control" center. It needed to be easily integratable with various systems, ensuring that our app remained the source of truth for the end-user without becoming entangled in the legacy debt of the internal systems it was masking.',
                ],
            },
            {
                id: 'implementation',
                label: 'Implementation Details',
                paragraphs: [
                    'I architected the system using a strict one-way communication model. The LaaS app acted as the commander, sending instructions to integrated systems through a decoupled Service Layer. To ensure a snappy user experience, we implemented a "Hit and Forget" asynchronous strategy. When a user performed an action, the system identified the target via an Integration Factory and dispatched a background job, logging the intent and providing an immediate response to the user while the actual API communication happened in the background.',
                    'For data integrity, we moved away from unpredictable arrays in favor of a strict DTO (Data Transfer Object) pattern for all internal data movement. While this added boilerplate, it centralized transformation logic and made the service layer significantly more robust. Multi-tenancy was handled via a Base Service that automatically scoped queries by `tenant_id`, while a "Tenant Masking" system allowed background jobs to impersonate the correct context without a logged-in user.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome & Business Reality',
                paragraphs: [
                    'Technically, the project was a success. The app was finished and reached production, successfully managing multiple tenants and integrating with several external systems simultaneously. It effectively "masked" the complexity of the back-end, proving that a rigid internal engine could be successfully abstracted into a user-friendly service.',
                    'However, the project reached production just one month before the distributor company collapsed due to broader market shifts. As a result, the project was discontinued shortly after launch. While the "LaaS-app" did not get the long-term flight time it was designed for, it stands as a successful proof of concept for decoupling legacy architecture and remains the most architecturally clean system I have built to date.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    'This project reinforced that software doesn’t exist in a vacuum; business health is the ultimate constraint. Architecturally, if I were to rebuild this today, I would introduce a Repository Layer to further decouple our logic from the database, as we currently rely heavily on Eloquent models.',
                    'I also recognized that our single-database multi-tenancy is a pragmatic choice for a medium-scale system, but the next logical step would be moving toward separated databases for high-value tenants to ensure complete performance isolation. These "small" technical debts were conscious trade-offs made to meet the ambitious launch timeline.',
                ],
            },
        ],
        glossary: [
            {
                term: 'Command and Control',
                definition:
                    'An architectural pattern where a central application dictates actions to satellite systems without those systems sharing a common state or database.',
            },
            {
                term: 'Hit and Forget',
                definition:
                    'An asynchronous integration pattern where a system sends a request and immediately moves to the next task, handling the response or confirmation via background processes.',
            },
            {
                term: 'Tenant Masking',
                definition:
                    'A mechanism used in multi-tenant systems to allow automated processes or background jobs to "impersonate" a specific tenant context to ensure data isolation.',
            },
        ],
        qnas: [
            {
                question: 'Why build a standalone app instead of updating the existing WMS/FMS?',
                answer: 'The legacy systems were built for experts and internal operators. Modifying them to be user-friendly for end-users would have required a massive rewrite of core logic. Creating a standalone bridge allowed us to move faster, keep the legacy systems stable, and provide a tailored experience for a completely different user persona.',
            },
        ],
    },
    id: null,
};

export function useLaasBridgeCaseData() {
    const { locale } = useI18n();

    return computed<CaseStudyArticle | null>(
        () => LAAS_BRIDGE_CASE_BY_LOCALE[locale.value] ?? LAAS_BRIDGE_CASE_BY_LOCALE.en,
    );
}

export default LAAS_BRIDGE_CASE_BY_LOCALE.en;
