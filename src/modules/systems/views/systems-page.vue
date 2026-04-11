<template>
    <div class="prose-content my-8">
        <section v-if="systems.length > 0" class="content-narrow pt-8 relative mx-auto">
            <TransitionGroup name="list" tag="div">
                <article
                    v-for="system in systems"
                    :id="system.id"
                    :key="system.id"
                    class="article-item mb-16"
                >
                    <h2 class="article-title">
                        {{ system.title }}
                    </h2>

                    <p class="article-meta">
                        {{ system.subtitle }}
                    </p>

                    <div class="flex flex-wrap gap-2 mb-6">
                        <span v-for="tag in system.tags" :key="tag" class="tag-pill">
                            {{ tag }}
                        </span>
                    </div>

                    <div class="space-y-6 text-text-primary">
                        <div v-for="(section, index) in system.sections" :key="index">
                            <p class="article-section-title">
                                {{ section.label }}
                            </p>
                            <p>{{ section.description }}</p>
                        </div>

                        <p v-if="system.link && system.link.label">
                            <router-link :to="system.link.href" class="magnetic-hover font-medium">
                                {{ system.link.label }}
                            </router-link>
                        </p>
                    </div>
                </article>
            </TransitionGroup>
        </section>

        <div v-else-if="availability.length > 0" class="py-16 text-center">
            <div class="max-w-md mx-auto">
                <div
                    class="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <FileQuestion class="text-text-secondary" />
                </div>
                <h1 class="text-2xl text-text-primary mb-2 font-bold">Language Not Available</h1>
                <p class="text-text-secondary mb-8">
                    This page is not yet available in your currently selected language. You can view
                    it in the available languages below:
                </p>
                <div class="flex flex-col gap-4 max-w-[250px] mx-auto">
                    <button
                        v-for="loc in availability"
                        :key="loc"
                        @click="switchLanguageTo(loc)"
                        class="btn-primary justify-center"
                    >
                        View in {{ loc === 'en' ? 'English' : 'Indonesian' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="py-16 text-center">
            <p class="text-text-secondary">No systems available.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { activeSection, language } from '@/store';
import { useSystemsAvailability, useSystemsData } from '@/modules/systems/data/systems.data.ts';
import { useSeo } from '@/core/composables/use-seo';
import { FileQuestion } from 'lucide-vue-next';

const systems = useSystemsData();
const availability = useSystemsAvailability();

const switchLanguageTo = (loc: string) => {
    const lang = loc.toLowerCase() === 'id' ? 'ID' : 'EN';
    language.value = lang;
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('language', lang);
    }
};

useSeo(
    computed(() => ({
        title: 'System Architecture',
        description: 'Deep dive into the architecture and systems I have built.',
    })),
);

let sectionObserver: IntersectionObserver | null = null;

const observeSections = () => {
    if (sectionObserver) sectionObserver.disconnect();

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id;
                }
            });
        },
        {
            rootMargin: '-20% 0px -50% 0px',
        },
    );

    const ids = systems.value.map((s) => s.id);
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    sectionObserver = observer;
};

watch(
    systems,
    () => {
        nextTick(() => {
            observeSections();
        });
    },
    { immediate: true },
);

onMounted(() => {
    // isDrawerEmpty now handled by useDrawerManagement
});

onUnmounted(() => {
    if (sectionObserver) sectionObserver.disconnect();
    activeSection.value = '';
});
</script>
