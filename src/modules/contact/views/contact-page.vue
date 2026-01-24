<template>
    <div v-if="page" class="content-narrow py-8">
        <section id="contact-info" class="content-narrow">
            <h1 class="text-3xl font-bold mb-6">
                {{ page.title }}
            </h1>
            <div class="space-y-4">
                <p
                    v-for="(paragraph, index) in page.descriptions"
                    :key="index"
                    v-html="paragraph"
                />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useContactData } from '@/modules/contact/data/contact.data.ts';

const page = useContactData();
</script>
