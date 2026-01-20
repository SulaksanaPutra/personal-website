<template>
    <footer class="pt-12 pb-16 border-t border-border-subtle text-sm text-text-secondary mt-18">
        <div class="container" v-if="page">
            <p class="mb-1">
                {{ page.copyright }}
            </p>
            <p class="text-text-secondary">
                {{ page.availability }}
                <a :href="`mailto:${page.email}`">{{ page.email }}</a>
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useFooterData } from '@/core/data/footer.data.ts';

const page = useFooterData();
</script>
