<template>
  <li class="flex gap-3">
    <div class="w-full">
      <a
        :href="`#${item.id}`"
        @click.prevent="$emit('click', item)"
        class="block font-medium text-base transition-colors duration-200"
        :class="isActive ? 'text-accent-primary' : 'text-text-primary hover:text-accent-primary'"
      >
        {{ item.label }}
      </a>
      <p class="text-sm text-text-secondary mt-1 leading-relaxed">
        {{ item.description }}
      </p>
      <div v-if="item.details && item.details.length" class="mt-2 space-y-1.5 border-l-2 border-border-subtle pl-3">
        <p v-for="(detail, index) in item.details" :key="index" class="text-xs text-text-secondary">
          <span class="text-text-primary font-medium">{{ detail.label }}:</span> {{ detail.text }}
        </p>
      </div>
      <div v-if="item.tags && item.tags.length" class="flex flex-wrap gap-1.5 mt-2">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="text-[10px] px-1.5 py-0.5 rounded border border-border-subtle text-text-secondary uppercase tracking-wider bg-bg-muted/50"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { CaseStudiesDrawer } from '@/data/types'

defineProps<{
  item: CaseStudiesDrawer
  isActive?: boolean
}>()

defineEmits<{
  (e: 'click', item: CaseStudiesDrawer): void
}>()
</script>
