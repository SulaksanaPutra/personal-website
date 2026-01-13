<template>
  <section class="content-narrow py-8 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">{{ writing.title }}</h1>
    <div class="text-justify hyphens-auto leading-relaxed space-y-4">
      <p v-for="(paragraph, index) in writing.paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import writingData from '../../data/home/sections/writing.json'

const writing = writingData
</script>
