import { computed, defineAsyncComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { isDrawerOpen } from '@/store';

const sectionRoutes = ['about', 'writing', 'projects', 'uses', 'hobbies'];

export function useDrawerManagement() {
    const route = useRoute();
    const drawerComponents = import.meta.glob('@/modules/**/components/*-drawer.vue');
    const asyncComponentCache: Record<string, any> = {};

    const currentDrawer = computed(() => {
        if (!route.name) return null;
        let routeName = typeof route.name === 'string' ? route.name : String(route.name);
        if (sectionRoutes.includes(routeName)) {
            routeName = 'home';
        }
        const targetPath = `/modules/${routeName}/components/${routeName}-drawer.vue`;
        const componentKey = Object.keys(drawerComponents).find((key) => key.endsWith(targetPath));

        if (!componentKey) return null;

        if (!asyncComponentCache[componentKey]) {
            asyncComponentCache[componentKey] = defineAsyncComponent(drawerComponents[componentKey] as any);
        }
        return asyncComponentCache[componentKey];
    });

    const getDrawerStateKey = () => {
        if (!route.name) return 'drawerOpen';
        let routeName = typeof route.name === 'string' ? route.name : String(route.name);
        if (sectionRoutes.includes(routeName)) {
            routeName = 'home';
        }
        return routeName + 'DrawerOpen';
    };

    const syncDrawerState = () => {
        const key = getDrawerStateKey();
        const stored = localStorage.getItem(key);

        if (
            ['/systems', '/case-studies', '/skills', '/contact'].includes(route.path) &&
            stored === null
        ) {
            isDrawerOpen.value = true;
            localStorage.setItem(key, 'true');
        } else {
            isDrawerOpen.value = stored === 'true';
        }
    };

    watch(
        () => route.path,
        () => {
            syncDrawerState();
        },
        { immediate: true },
    );

    return {
        currentDrawer,
        isDrawerOpen,
        sectionRoutes,
    };
}
