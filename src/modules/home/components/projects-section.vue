<template>
    <section v-if="page" class="content-narrow">
        <h1 class="heading-large">
            {{ page.title }}
        </h1>
        <div class="prose-content">
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
