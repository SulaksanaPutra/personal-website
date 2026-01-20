import { computed, ref, watch } from 'vue';
import { language } from '@/store';

const dataFiles = import.meta.glob('../data/**/*.ts');

const getActiveLocale = (): 'en' | 'id' => {
    const current = language.value.toLowerCase();

    if (current.startsWith('id')) {
        return 'id';
    }

    return 'en';
};

export function useI18n<T>(basePath: string) {
    const data = ref<T | null>(null);
    const value = computed(() => data.value);
    const activeLocale = computed(getActiveLocale);
    let lastRequestedLocale: 'en' | 'id' | null = null;

    const loadData = async (lang: 'en' | 'id') => {
        lastRequestedLocale = lang;
        let loadedData: T | null = null;

        if (lang !== 'en') {
            const localizedKey = `../data/${basePath}.${lang}.ts`;

            if (localizedKey in dataFiles) {
                try {
                    const module = (await dataFiles[localizedKey]()) as any;
                    if (module.default) {
                        loadedData = module.default;
                    }
                } catch (error) {
                    console.error(
                        `Could not load localized data for ${basePath} and locale ${lang}`,
                        error,
                    );
                }
            }
        }

        if (!loadedData) {
            const defaultKey = `../data/${basePath}.ts`;

            if (defaultKey in dataFiles) {
                try {
                    const module = (await dataFiles[defaultKey]()) as any;
                    loadedData = module.default;
                } catch (error) {
                    console.error(`Could not load data for ${basePath}`, error);
                }
            } else {
                console.error(`Data file not found for: ${basePath}`);
            }
        }

        if (lastRequestedLocale !== lang) {
            return;
        }

        data.value = loadedData;
    };

    watch(
        activeLocale,
        (lang) => {
            void loadData(lang);
        },
        { immediate: true },
    );

    return { data: value };
}
