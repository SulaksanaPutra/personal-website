<template>
    <div v-if="page" class="content-narrow py-8">
        <h1 class="text-2xl font-semibold mb-6">
            {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, type Ref } from 'vue';
import { useI18n } from '@/core/composables/use-i18n.ts';
import { Skills } from '@/modules/skills/skills.types.ts';
import defaultSkills from '@/modules/skills/data/skills.data.ts';

const { data }: { data: Ref<Skills | null> } = useI18n<Skills>('skills/skills-page');

const page = computed<Skills>(() => data.value ?? (defaultSkills as Skills));
</script>
