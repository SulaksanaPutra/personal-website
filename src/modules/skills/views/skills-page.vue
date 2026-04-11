<template>
    <div class="prose-content content-narrow pt-8">
        <div v-if="page" class="flex-1 min-w-0">
            <section
                v-for="section in page.sections"
                :id="section.id"
                :key="section.id"
                class="mb-12 group"
            >
                <div class="skills-section-header">
                    <h2 class="skills-section-title">
                        {{ section.label }}
                    </h2>
                    <div class="skills-section-line"></div>
                </div>

                <p class="text-text-secondary mb-4 leading-relaxed">
                    {{ section.description }}
                </p>

                <ul class="skills-list">
                    <li
                        v-for="(point, index) in section.points"
                        :key="index"
                        class="skills-list-item"
                    >
                        <span class="skills-list-bullet">•</span>
                        <span class="skills-list-text">{{ point }}</span>
                    </li>
                </ul>
            </section>
        </div>

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
                    <router-link
                        to="/"
                        class="text-text-secondary hover:text-text-primary mt-2 text-sm underline underline-offset-4"
                    >
                        Back to home
                    </router-link>
                </div>
            </div>
        </div>

        <div v-else class="py-16 text-center">
            <p class="text-text-secondary">No skills data available.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSkillsAvailability, useSkillsData } from '@/modules/skills/data/skills.data.ts';
import { useSeo } from '@/core/composables/use-seo';
import { FileQuestion } from 'lucide-vue-next';
import { language } from '@/store';

const page = useSkillsData();
const availability = useSkillsAvailability();

const switchLanguageTo = (loc: string) => {
    const lang = loc.toLowerCase() === 'id' ? 'ID' : 'EN';
    language.value = lang;
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('language', lang);
    }
};

useSeo(
    computed(() => ({
        title: 'Skills & Expertise',
        description: 'Technical stack, core competencies, and professional execution frameworks.',
    })),
);
</script>
