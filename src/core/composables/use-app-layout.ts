import { ref, watch } from 'vue';
import { RouteLocationNormalized, useRoute } from 'vue-router';

export function useAppLayout(sectionRoutes: string[]) {
    const route = useRoute();
    const previousRouteName = ref<string | null>(null);

    const shouldTransition = (targetRoute: RouteLocationNormalized) => {
        const toName = targetRoute.name as string | undefined;
        const fromName = previousRouteName.value ?? undefined;
        return !(
            toName &&
            fromName &&
            sectionRoutes.includes(toName) &&
            sectionRoutes.includes(fromName)
        );
    };

    const getRouteKey = (targetRoute: RouteLocationNormalized) => {
        if (sectionRoutes.includes(targetRoute.name as string)) {
            return 'section-container';
        }
        return targetRoute.path;
    };

    watch(
        () => route.name,
        (_to, from) => {
            previousRouteName.value = (from as string | undefined) ?? null;
        },
        { immediate: true },
    );

    return {
        shouldTransition,
        getRouteKey,
    };
}
