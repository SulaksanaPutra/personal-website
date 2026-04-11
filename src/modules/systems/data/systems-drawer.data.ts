import { SystemsDrawer } from '@/modules/systems/systems.types.ts';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { computed } from 'vue';
import { SYSTEMS_BY_LOCALE } from '@/modules/systems/data/systems.data.ts';

const SYSTEMS_DRAWER_BY_LOCALE: Record<'en' | 'id', SystemsDrawer> = {
    en: [],
    id: [],
};

(['en', 'id'] as const).forEach((locale) => {
    const systems = SYSTEMS_BY_LOCALE[locale] || [];

    SYSTEMS_DRAWER_BY_LOCALE[locale] = systems.map((system) => ({
        id: system.id,
        label: system.heading,
        description: system.highlight,
    }));
});

export function useSystemsDrawerData() {
    const { locale } = useI18n();

    return computed<SystemsDrawer>(
        () => SYSTEMS_DRAWER_BY_LOCALE[locale.value] ?? SYSTEMS_DRAWER_BY_LOCALE.en,
    );
}

export default SYSTEMS_DRAWER_BY_LOCALE.en;
