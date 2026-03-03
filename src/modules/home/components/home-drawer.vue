<template>
    <aside
        class="fixed z-[60] md:z-30 left-0 h-screen w-64 bg-bg-main border-r border-border-subtle transition-transform duration-300 overflow-y-auto"
        :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
        :style="{ top: drawerTop, height: `calc(100vh - ${drawerTop})` }"
        @mouseleave="onDrawerMouseLeave"
    >
        <nav class="p-6 pt-10 relative">
            <button
                type="button"
                class="absolute top-4 right-4 md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-bg-muted"
                aria-label="Close menu"
                @click="toggleDrawer"
            >
                <X />
            </button>

            <ul>
                <template v-for="item in homeDrawer" :key="item.id">
                    <router-link v-slot="{ href, navigate }" :to="item.href || '/'" custom>
                        <li v-show="!item.isActive" class="flex gap-3 mb-6">
                            <div class="w-full">
                                <a
                                    :href="href"
                                    class="block font-medium text-base text-text-primary hover:text-accent-primary transition-opacity duration-300"
                                    @click="
                                        ($event) => {
                                            onItemClicked(item, $event);
                                            navigate($event);
                                            handleDrawerLinkClick();
                                        }
                                    "
                                >
                                    {{ item.label }}
                                </a>
                                <p
                                    class="text-sm text-text-secondary mt-1 leading-relaxed hyphens-auto snap-y snap-mandatory"
                                >
                                    {{ item.description }}
                                </p>
                            </div>
                        </li>
                    </router-link>
                </template>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { drawerTop, isDrawerOpen } from '@/store';
import { X } from 'lucide-vue-next';
import { HomeDrawerItem } from '@/modules/home/types/home.types.ts';
import { useHomeDrawerData } from '@/modules/home/data/home-drawer.data.ts';

const route: RouteLocationNormalizedLoaded = useRoute();

const drawerData = useHomeDrawerData();
const homeDrawer = ref<HomeDrawerItem[]>([]);
const pendingActiveItem = ref<HomeDrawerItem | null>(null);

watch(
    drawerData,
    (newData) => {
        homeDrawer.value = newData.map((item) => ({ ...item, isActive: false }));
        const path = route.path;
        homeDrawer.value.forEach((item) => {
            item.isActive = item.href === path;
        });
    },
    { immediate: true },
);

watch(
    () => route.path,
    (newPath) => {
        homeDrawer.value.forEach((item) => {
            if (pendingActiveItem.value && item.id === pendingActiveItem.value.id) return;
            item.isActive = item.href === newPath;
        });

        if (window.innerWidth < 768) {
            isDrawerOpen.value = false;
            return;
        }

        const savedState = localStorage.getItem('drawerOpen');
        if (savedState !== null) {
            isDrawerOpen.value = savedState === 'true';
        } else {
            isDrawerOpen.value = true;
            localStorage.setItem('drawerOpen', 'true');
        }
    },
    { immediate: true },
);

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
    if (window.innerWidth >= 768) {
        localStorage.setItem('drawerOpen', isDrawerOpen.value.toString());
    }
};

const handleDrawerLinkClick = () => {
    if (window.innerWidth < 768) {
        if (pendingActiveItem.value) {
            pendingActiveItem.value.isActive = true;
            pendingActiveItem.value = null;
        }
        isDrawerOpen.value = false;
    }
};

const onItemClicked = (item: HomeDrawerItem, _event: MouseEvent) => {
    let activeIndex = homeDrawer.value.findIndex((i: HomeDrawerItem) => i.isActive);

    // If there's no active item but there's a pending one, 
    // it means the user clicked another item without moving the mouse out.
    if (activeIndex === -1 && pendingActiveItem.value) {
        pendingActiveItem.value.isActive = true;
        activeIndex = homeDrawer.value.findIndex((i: HomeDrawerItem) => i.id === pendingActiveItem.value!.id);
    }

    pendingActiveItem.value = item;

    if (activeIndex !== -1) {
        const [activeItem] = homeDrawer.value.splice(activeIndex, 1);
        activeItem.isActive = false;
        // Move the previously active item to the end of the list
        homeDrawer.value.push(activeItem);
    }
};

const onDrawerMouseLeave = () => {
    if (pendingActiveItem.value) {
        pendingActiveItem.value.isActive = true;
        pendingActiveItem.value = null;
    }
};
</script>
