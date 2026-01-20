<template>
    <div v-if="page" class="content-narrow py-8">
        <h1 class="text-2xl font-semibold mb-6">
            {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { useSkillsData } from '@/modules/skills/data/skills.data.ts';

const page = useSkillsData();
</script>
