import { computed } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { Skills } from '@/modules/skills/skills.types.ts';

const SKILLS_BY_LOCALE: Record<'en' | 'id', Skills | null> = {
    en: {
        sections: [
            {
                id: 'system-oriented-full-stack-development',
                label: 'System-oriented full-stack development',
                paragraphs: [
                    'I design and build systems end to end, from backend architecture to frontend implementation. I’m comfortable moving across layers and choosing technologies based on constraints such as performance, maintainability, team experience, and long-term cost, rather than following trends.',
                ],
            },
            {
                id: 'backend-architecture-production-concerns',
                label: 'Backend architecture & production concerns',
                paragraphs: [
                    'I build backend services using PHP, Go, and Node.js with an emphasis on explicit logic, predictable data flow, and debuggability. I’m familiar with service and repository patterns, multi-tenancy, authentication flows (OAuth 2, JWT), and handling concurrency, particularly in Go. I tend to favor designs that remain understandable and operable under real production pressure.',
                ],
            },
            {
                id: 'frontend-implementation-with-structured-state-management',
                label: 'Frontend implementation with structured state management',
                paragraphs: [
                    'I implement frontend applications using React, Vue, Next.js, and Nuxt, with attention to state management, data ownership, and component boundaries. I’m familiar with design system–driven UI implementation using shadcn/ui and Material Design, focusing on consistency, accessibility, and maintainability. While I’m not a visual designer, I can reliably translate design systems and specifications into clean, scalable frontend code.',
                ],
            },
            {
                id: 'rendering-strategy-performance-awareness',
                label: 'Rendering strategy & performance awareness',
                paragraphs: [
                    'I understand both SSR and CSR approaches and choose between them based on functionality, SEO requirements, and user experience. I treat rendering strategy as a system-level decision rather than a framework default.',
                ],
            },
            {
                id: 'data-persistence',
                label: 'Data & persistence',
                paragraphs: [
                    'I work comfortably with SQL and NoSQL databases, including MySQL, MariaDB, PostgreSQL, and MongoDB. I care about clear data modeling, query behavior, and how database decisions affect performance and future change.',
                ],
            },
            {
                id: 'testing-automation-delivery',
                label: 'Testing, automation & delivery',
                paragraphs: [
                    'I’m familiar with unit testing and end-to-end testing and view tests as a safety net for refactoring rather than a checkbox. I work with Docker, GitHub workflows, CI/CD pipelines, data pipelines, and automation tools such as n8n. I’ve also used analytics and monitoring tools like Metabase to support data visibility.',
                ],
            },
            {
                id: 'integration-tooling-mindset',
                label: 'Integration & tooling mindset',
                paragraphs: [
                    'I integrate systems through APIs and internal tools with a focus on reducing operational friction. I’ve worked with collaboration and delivery tooling such as Jira and GitHub dashboards to support planning, visibility, and team workflows. For production observability, I’m familiar with error tracking and logging using tools like Sentry, and I value instrumentation that makes failures understandable and actionable rather than noisy.',
                ],
            },
            {
                id: 'workload-management-execution',
                label: 'Workload management & execution',
                paragraphs: [
                    'I’m comfortable working with task- and ticket-based workflows, including writing and refining requirements to make work executable rather than ambiguous. I’ve worked within Kanban and Scrumban processes and focus on clear priorities, controlled work-in-progress, and steady delivery. I prefer lightweight process that supports momentum and communication over rigid ceremony.',
                ],
            },
        ],
    },
    id: null,
};

export function useSkillsData() {
    const { locale } = useI18n();

    return computed<Skills | null>(() => SKILLS_BY_LOCALE[locale.value] ?? SKILLS_BY_LOCALE.en);
}

export default SKILLS_BY_LOCALE.en;
