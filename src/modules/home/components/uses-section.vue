<template>
    <section v-if="usesData" class="content-narrow">
        <h1 class="heading-large">
            {{ usesData.title }}
        </h1>
        <div class="prose-content">
            <p v-for="(paragraph, index) in usesData.descriptions" :key="index">
                <GlossaryText :text="paragraph" :items="glossaryItems" />
            </p>
            <ul class="list-disc pl-5 space-y-2">
                <li v-for="(item, index) in usesData.items" :key="index">
                    <GlossaryText :text="item" :items="glossaryItems" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, provide, watch } from 'vue';
import { useUsesData } from '@/modules/home/data/uses.data.ts';
import GlossaryText from '@/core/components/glossary-text.vue';
import { language } from '@/store';

const usesData = useUsesData();
const glossaryItems = computed(() => usesData.value?.glossary || []);

const glossaryRegistry = new Set<string>();
provide('glossaryRegistry', glossaryRegistry);

watch(language, () => {
    glossaryRegistry.clear();
});
</script>
