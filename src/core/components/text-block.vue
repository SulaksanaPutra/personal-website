<template>
    <template v-if="!hasFormatting">
        <GlossaryText :text="text" :items="items" />
    </template>
    <template v-else>
        <template v-for="(part, index) in parts" :key="index">
            <code 
                v-if="part.isCode" 
                class="inline-code bg-bg-muted text-accent-primary px-1.5 py-0.5 rounded-md text-[0.85em] font-mono border border-border-subtle"
            >{{ part.text }}</code>
            <strong 
                v-else-if="part.isBold" 
                class="font-bold font-heading"
            >{{ part.text }}</strong>
            <GlossaryText v-else-if="part.text" :text="part.text" :items="items" />
        </template>
    </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import GlossaryText from './glossary-text.vue';
import { GlossaryItem } from '@/core/types/glossary.types';

const props = defineProps<{
    text: string;
    items?: GlossaryItem[];
}>();

const hasFormatting = computed(() => props.text?.includes('`') || props.text?.includes('*'));

const parts = computed(() => {
    if (!props.text) return [];
    
    const result: { text: string; isCode?: boolean; isBold?: boolean }[] = [];
    const regex = /(`[^`]+`|\*[^*]+\*)/g;
    const pieces = props.text.split(regex);
    
    pieces.forEach((piece) => {
        if (!piece) return;
        
        if (piece.startsWith('`') && piece.endsWith('`') && piece.length >= 2) {
            result.push({ text: piece.slice(1, -1), isCode: true });
        } else if (piece.startsWith('*') && piece.endsWith('*') && piece.length >= 2) {
            result.push({ text: piece.slice(1, -1), isBold: true });
        } else {
            result.push({ text: piece });
        }
    });
    
    return result;
});
</script>
