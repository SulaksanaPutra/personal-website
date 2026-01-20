<template>
    <section v-if="page" class="content-narrow py-8 min-h-screen">
        <h1 class="text-3xl font-bold mb-6">
            {{ page.title }}
        </h1>
        <div class="text-justify hyphens-auto leading-relaxed space-y-4">
            <p v-for="(paragraph, index) in page.descriptions" :key="index">
                {{ paragraph }}
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useProjectsData } from '@/modules/home/data/projects.data.ts';

const page = useProjectsData();
</script>
