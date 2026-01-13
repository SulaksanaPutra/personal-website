<template>
  <div class="content-narrow py-8">
    <h1 class="text-2xl font-semibold mb-6">{{ skills.title }}</h1>
    <p>{{ skills.description }}</p>
  </div>
</template>

<script setup lang="ts">
import skillsData from '../data/skills/skills.json'

const skills = skillsData
</script>
