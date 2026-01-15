<template>
  <li class="flex gap-3">
    <div class="w-full">
      <router-link
        :to="item.to || '/'"
        class="block font-medium text-text-primary hover:text-accent-primary"
        active-class="text-accent-primary"
        @click="$emit('click', item)"
      >
        {{ item.label }}
      </router-link>
      <p class="text-sm text-text-secondary mt-1 leading-relaxed">
        {{ item.description }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { HomeDrawer } from '@/data/types'

defineProps<{
  item: HomeDrawer
  isActive?: boolean
}>()

defineEmits<{
  (e: 'click', item: HomeDrawer): void
}>()
</script>
