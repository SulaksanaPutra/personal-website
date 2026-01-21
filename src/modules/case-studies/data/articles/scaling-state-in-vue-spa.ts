import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const SCALING_STATE_IN_VUE_SPA_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> = {
    en: {
        id: 'front-end-state-management-at-scale',
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: '← Back to Case Studies',
        },
        title: 'Front-end State Management at Scale (Vue → Vuex)',
        heading: 'State Management at Scale',
        subtitle:
            'An incremental approach to scaling a large, long-lived Vue 2 single-page application by moving from deeply nested prop-based state to predictable, centralized state management with Vuex',
        highlight:
            'Improving maintainability in a large Vue 2 SPA by centralizing shared state with Vuex.',
        description:
            'Twin v1 is a long-lived single-page application. As it grew, prop-based state management became unsustainable. This case study shows how Vuex was introduced incrementally to improve maintainability, predictability, and team onboarding.',
        systemId: 'system-twin-v1',
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Twin v1 is a large, long-lived single-page application built with Vue 2. In its early stages, state was managed through component props and callbacks, with parent components passing data down and handling business logic centrally.',
                    'This approach worked when the application was small. As features accumulated and the UI became more complex, the front end started to show clear signs of architectural strain.',
                ],
            },
            {
                id: 'problem',
                label: 'The Problem',
                items: [
                    'State was passed through props across deep component trees, with child components communicating changes back to parents via callbacks and events.',
                    'Over time, one complex page could contain 9 to 15 nested components.',
                    'Business logic accumulated in parent components.',
                    'Child-to-child communication required routing state through parents first.',
                    'Data flow became difficult to trace and reason about.',
                    'Bugs caused by stale props became common.',
                    'Debugging required understanding long, implicit data chains.',
                    'Although each component was designed for a specific business process and API, forcing business logic to live in parent components added complexity instead of clarity.',
                    'Adding or adjusting features became slow and risky, especially for developers unfamiliar with the original design.',
                ],
            },
            {
                id: 'trigger',
                label: 'Trigger Moment',
                paragraphs: [
                    'The breaking point came during a company-wide reshuffle when new developers joined the team. They struggled to understand and safely modify the front-end codebase.',
                    'The UI was already complex, but the lack of clear state boundaries made onboarding and maintenance significantly harder. At that point, the cost of not addressing state management became higher than the cost of change.',
                ],
            },
            {
                id: 'constraints',
                label: 'Constraints',
                items: [
                    'This was a live production system (Twin v1).',
                    'A full front-end rewrite was not realistic due to the number of pages.',
                    'The system was still actively receiving feature requests.',
                    'Refactoring had to be done incrementally.',
                    'The work was shared between me and another developer.',
                    'There was no hard deadline; this was a medium-priority, long-running improvement.',
                    'The challenge was improving maintainability without disrupting ongoing development.',
                ],
            },
            {
                id: 'decision',
                label: 'Decision',
                paragraphs: [
                    'We chose to introduce Vuex as a centralized state management solution. At the time, this system was built on Vue 2, before Vue introduced built-in global state patterns. Vuex was the officially recommended solution and provided shared global state, predictable data flow, strong debugging support via browser extensions, and a clear mental model for growing SPAs. Alternative approaches were limited, and continuing with props-based state was no longer sustainable.',
                ],
            },
            {
                id: 'migration',
                label: 'Migration Strategy',
                items: [
                    'Vuex was introduced incrementally, feature by feature.',
                    'We prioritized frequently changed and operationally critical features, such as calculation-heavy and operational pages.',
                    'Existing prop-based logic continued to coexist during the transition.',
                    'Over time, most complex pages adopted Vuex, while lower-risk or rarely touched areas remained unchanged.',
                    'This minimized disruption while delivering immediate value.',
                ],
            },
            {
                id: 'implementation',
                label: 'Implementation Highlights',
                paragraphs: [
                    'The Vuex store was organized into modules, aligned with major business areas. Only state shared across multiple components was moved into Vuex, while local, component-specific state remained inside components. All shared state mutations were handled exclusively through Vuex mutations and actions. Component-specific logic stayed decoupled and local, keeping the store minimal and focused. This avoided overengineering while still providing structure and clarity.',
                ],
            },
            {
                id: 'risk',
                label: 'Risk Management',
                paragraphs: [
                    'Migration was done feature by feature to carefully manage complexity. Each migrated feature underwent manual testing and user acceptance testing since no UI automation was available at the time. Changes were carefully scoped and refactoring was scheduled to avoid conflicts with concurrent feature requests targeting the same areas. Because each feature migration was isolated, rollbacks were straightforward, minimizing risk during the transition.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome',
                paragraphs: [
                    'Development speed improved significantly, with changes that previously took three to four days now completed in one to two days. Debugging became easier due to the predictable data flow and enhanced tooling, leading to a decrease in UI-related bugs. New developers were able to understand and modify the system more confidently. The improvement was behavioral and structural, rather than merely cosmetic.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    'Today, I would not automatically choose Vuex for every project. With modern frameworks like Vue 3, built-in global state patterns often provide sufficient structure without an additional dependency.',
                    'What this experience reinforced, however, is that shared state in SPAs should be treated as a first-class architectural concern from the start. Explicitly defining how data flows between components, centralizing only truly shared state, and keeping component-specific logic local reduces complexity as the application grows, improves maintainability, and supports safer onboarding.',
                    'Scalable UI systems are not about frameworks—they are about making data flow predictable and understandable as complexity increases.',
                ],
            },
        ],
    },
    id: null,
};

export function useScalingStateInVueSpaData() {
    const { locale } = useI18n();

    return computed<CaseStudyArticle | null>(
        () =>
            SCALING_STATE_IN_VUE_SPA_BY_LOCALE[locale.value] ??
            SCALING_STATE_IN_VUE_SPA_BY_LOCALE.en,
    );
}

export default SCALING_STATE_IN_VUE_SPA_BY_LOCALE.en;
