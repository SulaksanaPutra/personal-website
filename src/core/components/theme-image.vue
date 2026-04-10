<template>
    <img :src="currentSrc" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isDark } from '@/store';

interface ThemeImageProps {
    src: string | { light: string; dark: string };
}

const props = defineProps<ThemeImageProps>();

const currentSrc = computed(() => {
    if (typeof props.src === 'string') {
        return props.src;
    }
    return isDark.value ? props.src.dark : props.src.light;
});
</script>
