<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <div class="flex flex-grow transition-all duration-300">
            <component :is="currentDrawer" />
            <main
                class="container flex-grow pt-0 pb-16 transition-all duration-300"
                :class="isDrawerOpen ? 'md:ml-64' : ''"
            >
                <router-view v-slot="{ Component: RoutedComponent, route: routedRoute }">
                    <transition :name="shouldTransition(routedRoute) ? 'fade' : ''" mode="out-in">
                        <component :is="RoutedComponent" :key="getRouteKey(routedRoute)" />
                    </transition>
                </router-view>
            </main>
        </div>
        <Footer class="transition-all duration-30" :class="isDrawerOpen ? 'md:ml-32' : ''" />
    </div>
</template>

<script setup lang="ts">
import Header from '@/core/layout/header.vue';
import Footer from '@/core/layout/footer.vue';
import { useTheme } from '@/core/composables/use-theme';
import { useScrollProgress } from '@/core/composables/use-scroll-progress';
import { useDrawerManagement } from '@/core/composables/use-drawer-management';
import { useAppLayout } from '@/core/composables/use-app-layout';

// --- Composables ---
useTheme();
useScrollProgress();
const { currentDrawer, isDrawerOpen, sectionRoutes } = useDrawerManagement();
const { shouldTransition, getRouteKey } = useAppLayout(sectionRoutes);
</script>

