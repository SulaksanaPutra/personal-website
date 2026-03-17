import { CaseStudyArticle } from '@/modules/case-studies/case-studies.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

export const LAAS_OBSERVABILITY_CASE_BY_LOCALE: Record<'en' | 'id', CaseStudyArticle | null> = {
    en: {
        backLink: {
            id: 'case-studies',
            href: '/case-studies',
            label: 'Back to Case Studies',
        },
        id: 'laas-observability-sse-background-jobs',
        systemIds: ['system-laas'],
        title: 'The Silent Failure: Real-Time Observability in Asynchronous Systems',
        heading: 'The Silent Failure',
        highlight:
            'LaaS App — Implementing Server-Sent Events (SSE) and segregated logging to resolve the observability gap in a background-heavy "Hit-and-Forget" architecture.',
        subtitle:
            'How we gave the system a voice by replacing silent background failures with real-time user notifications and worker health monitoring.',
        sections: [
            {
                id: 'context',
                label: 'Context',
                paragraphs: [
                    'As established in the previous architecture, the LaaS system relied heavily on a "Hit-and-Forget" mechanism. This approach was designed for maximum efficiency; the application would accept a request, acknowledge it immediately, and handle the heavy lifting of WMS and FMS integrations in the background. From a stability standpoint, it was successful—as long as the system accepted the request, the user felt the app was working perfectly.',
                    'However, this efficiency created a dangerous disconnect. Because the logic was encapsulated in background jobs, the user interface remained static. The system was performing complex, high-stakes logistics tasks in a "black box," and when something went wrong in the background, the user was left entirely in the dark.',
                ],
            },
            {
                id: 'problem',
                label: 'Problem',
                paragraphs: [
                    'The core issue was a lack of real-time feedback. In a logistics environment, unexpected errors are inevitable—API timeouts, credential expirations, or payload mismatches. Without a notification system, these background failures were silent. A user might see a shipment marked as "In Process" indefinitely, unaware that the integration job had actually failed five minutes ago.',
                    'This lack of visibility caused data drift and operational friction. Users couldn’t react to errors they couldn’t see, leading to situations where physical warehouse actions were stalled because the digital command had failed silently. We had built a stable engine, but we had forgotten to give it a dashboard.',
                ],
            },
            {
                id: 'solution',
                label: 'Solution',
                paragraphs: [
                    'To bridge this gap, I led the team in implementing Server-Sent Events (SSE). We chose SSE over WebSockets because our requirements were strictly one-way; the server needed to push updates to the client without the overhead of a full duplex connection. This allowed us to broadcast state changes and background errors directly to the user’s browser in real-time, transforming a "silent failure" into an actionable alert.',
                    'We also overhauled our logging strategy by implementing "Encapsulated Error Logs." We segregated logs for Inbound and Outbound integrations into separate database tables, ensuring that a failure in a warehouse sync wouldn’t leak into or clutter the context of a delivery sync. To further harden the system, I introduced a worker health check mechanism to monitor the background processes themselves, ensuring that if the "heartbeat" of our asynchronous engine stopped, we would know immediately.',
                ],
            },
            {
                id: 'outcome',
                label: 'Outcome',
                paragraphs: [
                    'The implementation of SSE and health checks turned the LaaS app into a truly responsive platform. Users were finally informed of background errors as they happened, and our team could trace failures with precision thanks to the segregated logs. The system became significantly more stable, not because it failed less, but because it handled failure with honesty.',
                    'Ironically, the system reached its peak observability just as the distributor company began its final descent into collapse. The "dashboard" was finally lit up, but the business behind it was fading. Nevertheless, the project proved that in an asynchronous world, real-time feedback isn’t a luxury—it is the only way to maintain user trust.',
                ],
            },
            {
                id: 'reflection',
                label: 'Reflection',
                paragraphs: [
                    'This project taught me that the "Hit-and-Forget" pattern is incomplete without a robust feedback loop. SSE provided a satisfying and lightweight solution to a complex visibility problem, and I would use it again for any web-first application with similar constraints. However, I’ve also learned that if the target had been a mobile application, SSE’s limitations regarding connection persistence would have forced us toward a more complex WebSocket or Push Notification approach.',
                    'The decision to segregate logs was a pragmatic win that I now carry into every new architecture. It’s a small detail that saves hours during an incident. My only regret is that the system didn’t get the chance to "fly high" for longer; we had finally solved the ghost-in-the-machine problem, only for the machine itself to be turned off.',
                ],
            },
        ],
        glossary: [
            {
                term: 'Server-Sent Events (SSE)',
                definition:
                    'A standard allowing servers to push real-time data to web pages over HTTP. Unlike WebSockets, it is a one-way communication channel from server to client.',
            },
            {
                term: 'Encapsulated Logging',
                definition:
                    'A strategy where logs are separated by domain or integration type to prevent data leakage and make debugging more focused.',
            },
            {
                term: 'Worker Health Check',
                definition:
                    'A monitoring process that verifies background task runners (workers) are alive and processing jobs as expected.',
            },
        ],
        qnas: [
            {
                question: 'Why not use WebSockets instead of SSE?',
                answer: 'SSE was chosen for its simplicity and lower resource overhead. Since we only needed the server to "push" notifications to the user about job statuses, the bi-directional nature of WebSockets would have added unnecessary complexity to our infrastructure.',
            },
        ],
    },
    id: null,
};

export function useLaasObservabilityCaseData() {
    const { locale } = useI18n();

    return computed<CaseStudyArticle | null>(
        () =>
            LAAS_OBSERVABILITY_CASE_BY_LOCALE[locale.value] ?? LAAS_OBSERVABILITY_CASE_BY_LOCALE.en,
    );
}

export default LAAS_OBSERVABILITY_CASE_BY_LOCALE.en;
