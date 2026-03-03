<template>
    <section v-if="page" class="content-narrow">
        <h1 class="heading-large">
            {{ page.title }}
        </h1>
        <div class="prose-content">
            <p v-for="(paragraph, index) in page.descriptions" :key="index">
                {{ paragraph }}
            </p>
            <ul class="list-disc pl-5 space-y-2">
                <li v-for="(item, index) in page.items" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useUsesData } from '@/modules/home/data/uses.data.ts';

const page = useUsesData();
</script>
