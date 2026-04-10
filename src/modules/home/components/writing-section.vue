<template>
    <section v-if="page" class="content-narrow">
        <header class="mb-12">
            <h1 class="heading-large mb-4">
                {{ page.title }}
            </h1>
            <div class="prose-content">
                <p v-for="(paragraph, index) in page.descriptions" :key="index">
                    {{ paragraph }}
                </p>
            </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <router-link
                v-for="writing in writings"
                :key="writing.id"
                :to="writing.link.href"
                class="group block"
            >
                <div class="relative aspect-video mb-4 overflow-hidden rounded-2xl border border-border-subtle bg-bg-muted group-hover:border-accent-primary/50 transition-all">
                    <img
                        :src="writing.thumbnail"
                        :alt="writing.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div class="space-y-2">
                    <div class="flex items-center gap-2 text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                         <Clock class="w-3 h-3" />
                         {{ writing.date }}
                    </div>
                    <h3 class="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                        {{ writing.title }}
                    </h3>
                    <p class="text-sm text-text-secondary line-clamp-2">
                        {{ writing.subtitle }}
                    </p>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useWritingData } from '@/modules/home/data/writing.data';
import { useWritingsData } from '@/modules/writings/data/writings.data';
import { Clock } from 'lucide-vue-next';

const page = useWritingData();
const writings = useWritingsData();
</script>
