import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const SCALING_STATE_IN_VUE_SPA_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> = {
    en: {
        id: 'front-end-state-management-at-scale',
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: 'Back to Case Studies',
        },
        title: 'Front-end State Management at Scale (Vue → Vuex)',
        heading: 'State Management at Scale',
        subtitle:
            'Untangling a fragile Vue Single-Page Application by slowly migrating away from deeply nested prop-drilling toward centralized state management—without halting feature delivery.',
        highlight:
            'Twin v1 — Paying down front-end architectural debt by replacing unsustainable prop-drilling with Vuex.',
        description:
            'As Twin v1 grew into a massive SPA, its reliance on prop-based state became a cognitive nightmare. This case study details the painful but necessary incremental migration to Vuex to restore team velocity and system predictability.',
        systemIds: ['system-twin-v1'],
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'Twin v1’s front end was built in Vue. In the optimistic early days, state management was simple: we relied entirely on `props` passed down and events (`$emit`) pushed back up. It was clean, predictable, and perfectly adequate for small features.',
                    'However, as business requirements compounded, the application mutated into a massive Single-Page Application (SPA). Pages stopped being simple views and evolved into complex, multi-step business workflows that wrangled multiple APIs, heavy client-side calculations, and tangled UI states simultaneously.',
                ],
            },
            {
                id: 'problem',
                label: 'The Problem',
                paragraphs: [
                    'Eventually, the component tree became a cognitive maze. We ended up with bloated "god components" acting as puppet masters for 9 to 15 levels of nested children. Because `state` was trapped in the parent, data had to be manually passed down through layers of components that didn’t even care about it, just to reach a deeply nested child.',
                    'When sibling components needed to communicate, the data flow became virtually impossible to trace. A minor state change in one corner of the UI would unpredictably shatter a workflow in another. The symptoms of this architectural debt became glaringly obvious:',
                ],
                items: [
                    'Debugging meant tracing dizzying, multi-level chains of `props` and emitted events.',
                    'Stale `props` and race conditions spawned subtle, irreproducible bugs.',
                    'Velocity tanked; adding a simple feature felt like navigating a minefield.',
                    'A culture of fear set in—developers were terrified to touch existing components lest the whole page collapse.',
                ],
            },
            {
                id: 'problem-conclusion',
                paragraphs: [
                    'At this point, we weren\'t just dealing with "messy code." The fundamental architecture had turned against us, making every new business request prohibitively expensive to build.',
                ],
            },
            {
                id: 'trigger',
                label: 'Trigger',
                paragraphs: [
                    'The breaking point arrived during a team reshuffle. When new, highly experienced developers joined, they were completely paralyzed by the codebase. Explaining a single feature required whiteboarding convoluted callback chains and apologizing for the architecture.',
                    'That was the moment I had to admit the harsh reality: the problem wasn’t that the team lacked discipline. The problem was the complete absence of a shared, predictable state model.',
                ],
            },
            {
                id: 'constraints',
                label: 'Constraints',
                paragraphs: [
                    'As always, we were constrained by reality: this was a live, revenue-generating production system. Pausing development for a glamorous, ground-up rewrite was out of the question. We had a constant influx of feature requests from the business, and any structural improvements had to happen surgically, while the engine was still running.',
                ],
            },
            {
                id: 'decision',
                label: 'Decision',
                paragraphs: [
                    "We decided to introduce `Vuex`. At the time, Vue didn't have the robust built-in reactivity APIs (like `ref` or `reactive`) it does today, making Vuex the official, pragmatic choice. It offered exactly what we were starved for: a single source of truth, predictable one-way data flow (`actions` -> `mutations` -> `state`), and dev tools that actually let us see what was happening.",
                    'Continuing without a global store wasn’t a brave stand against dependencies; it was architectural negligence. The prop-drilling had to stop.',
                ],
            },
            {
                id: 'Approach',
                label: 'Approach',
                paragraphs: [
                    'We committed to a slow, incremental migration. Instead of trying to boil the ocean, we targeted the most painful, calculation-heavy operational pages first—the ones that broke the most often.',
                    "For a long time, we lived with a fractured architecture. Legacy prop-based pages coexisted alongside newly refactored `Vuex` modules. It wasn't pretty, but it was the only way to pay down the technical debt without halting feature delivery.",
                ],
            },
            {
                id: 'implementation',
                label: 'Implementation',
                paragraphs: [
                    'When we did implement Vuex, we structured the store by business domain (e.g., `store/modules/invoicing.js`), not by UI layout. I established a strict rule: only state that genuinely needed to be shared across the application was allowed into the global store.',
                    'Local, ephemeral UI state (like a `v-model` for a dropdown toggle) stayed locked inside local components. We enforced strict state transitions—direct state manipulation (`state.x = y`) was forbidden; everything had to flow through `mutations`. The goal wasn’t to centrally manage everything, but to centrally manage only what was causing us pain.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome',
                paragraphs: [
                    'The extraction worked. Velocity slowly returned. Features that previously took days of anxious prop-wiring were suddenly being shipped in hours. Debugging shifted from a guessing game to a predictable science of checking state transitions in the Vue dev tools.',
                    'The fragile, house-of-cards feeling faded, and developers stopped being afraid of the codebase. It’s worth noting that this wasn’t a performance optimization—the app didn’t necessarily run faster for the user. But it massively optimized the cognitive load for the engineers maintaining it.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    "Looking back, I wouldn't touch `Vuex` for a modern project today; Vue 3’s `Composition API` and `Pinia` have made it largely obsolete. But the underlying architectural lesson remains permanently etched in my mind: state management is not an optimization you tack on later. It is a foundational design decision.",
                    'I learned the hard way that introducing centralized state to a mature SPA is an agonizing process of untangling wires. Since this project, I always define clear state boundaries on day one. Global state stays global, local state stays local, and I never let a component tree grow deep enough to become a cognitive trap.',
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
