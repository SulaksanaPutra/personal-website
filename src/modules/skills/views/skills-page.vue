<template>
    <div v-if="page" class="prose-content content-narrow pt-8">
        <div class="flex-1 min-w-0">
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
    </div>
</template>

<script setup lang="ts">
import { useSkillsData } from '@/modules/skills/data/skills.data.ts';

const page = useSkillsData();
</script>
