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
            <a 
                v-else-if="part.isLink" 
                :href="part.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent-primary hover:text-accent-primary/80 underline underline-offset-4 decoration-accent-primary/30 hover:decoration-accent-primary transition-all inline-flex items-center gap-0.5"
            >
                {{ part.text }}
                <ExternalLink v-if="isExternal(part.href)" class="w-3 h-3 opacity-60" />
            </a>
            <GlossaryText v-else-if="part.text" :text="part.text" :items="items" />
        </template>
    </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ExternalLink } from 'lucide-vue-next';
import GlossaryText from './glossary-text.vue';
import { GlossaryItem } from '@/core/types/glossary.types';

const props = defineProps<{
    text: string;
    items?: GlossaryItem[];
}>();

const hasFormatting = computed(() => 
    props.text?.includes('`') || 
    props.text?.includes('*') || 
    props.text?.includes('[') || 
    props.text?.includes('<a')
);

const isExternal = (url?: string) => {
    if (!url) return false;
    return url.startsWith('http') || url.startsWith('//');
};

const parts = computed(() => {
    if (!props.text) return [];
    
    const result: { text: string; isCode?: boolean; isBold?: boolean; isLink?: boolean; href?: string }[] = [];
    const regex = /(`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|<a\s+[^>]*>.*?<\/a>)/g;
    const pieces = props.text.split(regex);
    
    pieces.forEach((piece) => {
        if (!piece) return;
        
        if (piece.startsWith('`') && piece.endsWith('`') && piece.length >= 2) {
            result.push({ text: piece.slice(1, -1), isCode: true });
        } else if (piece.startsWith('*') && piece.endsWith('*') && piece.length >= 2) {
            result.push({ text: piece.slice(1, -1), isBold: true });
        } else if (piece.startsWith('[') && piece.includes('](') && piece.endsWith(')')) {
            const match = piece.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (match) {
                result.push({ text: match[1], href: match[2], isLink: true });
            } else {
                result.push({ text: piece });
            }
        } else if (piece.startsWith('<a') && piece.endsWith('</a>')) {
            const hrefMatch = piece.match(/href="([^"]+)"/);
            const textMatch = piece.match(/>(.*?)<\/a>/);
            if (hrefMatch && textMatch) {
                result.push({ text: textMatch[1], href: hrefMatch[1], isLink: true });
            } else {
                result.push({ text: piece });
            }
        } else {
            result.push({ text: piece });
        }
    });
    
    return result;
});
</script>
