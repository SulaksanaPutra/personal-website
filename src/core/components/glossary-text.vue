<template>
    <span v-if="!hasMatches">{{ text }}</span>
    <template v-else>
        <template v-for="(part, index) in parts" :key="index">
            <span v-if="part.isGlossary" class="glossary-term">
                {{ part.text }}
                <span v-if="part.definition" class="glossary-tooltip">
                    {{ part.definition }}
                </span>
            </span>
            <template v-else>{{ part.text }}</template>
        </template>
    </template>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { language } from '@/store';
import { GLOSSARY_BY_LOCALE } from '@/core/data/common-glossary.data';
import { GlossaryItem } from '@/core/types/glossary.types';

const props = defineProps<{
    text: string;
    items?: GlossaryItem[];
}>();

// Inject a shared registry (Set) from parent if available to track matches across components
const glossaryRegistry = inject<Set<string> | null>('glossaryRegistry', null);

// Helper to escape regex special characters
const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const glossary = computed(() => {
    const localeKey = language.value.toLowerCase() as 'en' | 'id';
    const coreItems = GLOSSARY_BY_LOCALE[localeKey] || GLOSSARY_BY_LOCALE.en;
    
    // Combine core items with modular items
    const glossaryMap = new Map<string, GlossaryItem>();
    
    // Process core items first
    coreItems.forEach(item => {
        glossaryMap.set(item.term.toLowerCase(), { ...item });
    });
    
    // Process modular items second (override core)
    if (props.items && Array.isArray(props.items)) {
        props.items.forEach(item => {
            if (item && item.term) {
                glossaryMap.set(item.term.toLowerCase(), { ...item });
            }
        });
    }
    
    // Sort by length descending to match longest phrases first
    return Array.from(glossaryMap.values()).sort((a, b) => b.term.length - a.term.length);
});

const hasMatches = computed(() => {
    if (!props.text || glossary.value.length === 0) return false;
    const lowerText = props.text.toLowerCase();
    
    // Optimization: check if any term exists in the text
    // Also respect the shared registry - if all possible matches are already in the registry, we don't need to process
    return glossary.value.some(item => {
        const lowerTerm = item.term.toLowerCase();
        if (glossaryRegistry?.has(lowerTerm)) return false;
        return lowerText.includes(lowerTerm);
    });
});

interface TextPart {
    text: string;
    isGlossary: boolean;
    definition?: string;
}

const parts = computed(() => {
    if (!props.text) return [];
    
    let result: TextPart[] = [{ text: props.text, isGlossary: false }];
    
    // Local set for this specific component instance to prevent duplicate tooltips in one block
    const instanceMatched = new Set<string>();
    
    for (const item of glossary.value) {
        const term = item.term;
        const lowerTerm = term.toLowerCase();
        
        // If already matched in another component or earlier in this one, skip
        if (glossaryRegistry?.has(lowerTerm) || instanceMatched.has(lowerTerm)) {
            continue;
        }

        const newResult: TextPart[] = [];
        const escapedTerm = escapeRegExp(term);
        const regex = new RegExp(`(\\b${escapedTerm}\\b)`, 'gi');
        
        let foundMatchInThisComponent = false;

        for (const part of result) {
            if (part.isGlossary || foundMatchInThisComponent) {
                newResult.push(part);
                continue;
            }
            
            const splitContent = part.text.split(regex);
            
            for (const subPart of splitContent) {
                if (!foundMatchInThisComponent && subPart.toLowerCase() === lowerTerm) {
                    newResult.push({
                        text: subPart, 
                        isGlossary: true,
                        definition: item.definition
                    });
                    
                    // Mark as found globally and locally
                    glossaryRegistry?.add(lowerTerm);
                    instanceMatched.add(lowerTerm);
                    foundMatchInThisComponent = true;
                } else if (subPart) {
                    newResult.push({
                        text: subPart,
                        isGlossary: false
                    });
                }
            }
        }
        result = newResult;
    }
    
    return result;
});
</script>
