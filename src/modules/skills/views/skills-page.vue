<template>
    <div v-if="page" class="content-narrow py-8">
        <div class="flex-1 min-w-0">
            <section
                v-for="section in page.sections"
                :id="section.id"
                :key="section.id"
                class="mb-8 pb-8 border-b border-border-subtle last:border-0 last:mb-0 last:pb-0"
            >
                <h2 class="text-xl font-semibold text-text-primary mb-4" v-if="section.label">
                    {{ section.label }}
                </h2>
                <div
                    v-if="section.paragraphs"
                    class="space-y-4 text-justify hyphens-auto leading-relaxed"
                >
                    <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">
                        {{ paragraph }}
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSkillsData } from '@/modules/skills/data/skills.data.ts';

const page = useSkillsData();
</script>
