<template>
  <section class="content-narrow py-8 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">{{ projects.title }}</h1>
    <div class="text-justify hyphens-auto leading-relaxed space-y-4">
      <p v-for="(paragraph, index) in projects.paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import projectsData from '../../data/home/sections/projects.json'

const projects = projectsData
</script>
