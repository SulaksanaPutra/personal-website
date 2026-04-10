import { WritingArticle, Writings } from '@/modules/writings/writings.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';

const articleModules = import.meta.glob('./articles/*.ts', { eager: true });

const articlesByLocale: Record<'en' | 'id', WritingArticle | null>[] = [];

for (const path in articleModules) {
    const mod = articleModules[path] as any;
    const localeMap = Object.values(mod).find(
        (val: any) => val && typeof val === 'object' && 'en' in val && 'id' in val,
    ) as Record<'en' | 'id', WritingArticle | null> | undefined;

    if (localeMap) {
        articlesByLocale.push(localeMap);
    }
}

export function useWritingsData() {
    const { locale } = useI18n();

    return computed<Writings>(() => {
        return articlesByLocale
            .map((articleMap) => articleMap[locale.value] || articleMap.en)
            .filter((article): article is WritingArticle => !!article)
            .map((article) => ({
                id: article.id,
                title: article.title,
                subtitle: article.subtitle || '',
                thumbnail: article.thumbnail,
                date: article.date,
                link: {
                    id: 'read-' + article.id,
                    href: '/writing/' + article.id,
                    label: 'Read Article →',
                },
            }));
    });
}

export function useWritingArticle(articleId: string) {
    const { locale } = useI18n();

    return computed<WritingArticle | null>(() => {
        const articleMap = articlesByLocale.find((map) => {
            const article = map[locale.value] || map.en;
            return article?.id === articleId;
        });

        return articleMap ? articleMap[locale.value] || articleMap.en : null;
    });
}
