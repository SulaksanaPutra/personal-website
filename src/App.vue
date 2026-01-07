<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 bg-bg-main py-3 border-b border-border-subtle transition-colors duration-300">
      <div class="container flex flex-col md:flex-row justify-between items-start md:items-center">
        <div class="font-semibold text-xl text-text-primary tracking-tight mb-4 md:mb-0">Bayu Aksana</div>
        <nav class="flex items-center">
          <ul class="flex flex-wrap gap-x-9 gap-y-3 list-none p-0 m-0 mr-6">
            <li>
              <router-link to="/" class="text-base text-text-secondary hover:text-text-primary hover:no-underline" active-class="text-text-primary font-semibold">Home</router-link>
            </li>
            <li>
              <router-link to="/systems" class="text-base text-text-secondary hover:text-text-primary hover:no-underline" active-class="text-text-primary font-semibold">Systems</router-link>
            </li>
            <li>
              <router-link to="/case-studies" class="text-base text-text-secondary hover:text-text-primary hover:no-underline" active-class="text-text-primary font-semibold">Case Studies</router-link>
            </li>
            <li>
              <router-link to="/skills" class="text-base text-text-secondary hover:text-text-primary hover:no-underline" active-class="text-text-primary font-semibold">Skills</router-link>
            </li>
            <li>
              <router-link to="/now" class="text-base text-text-secondary hover:text-text-primary hover:no-underline" active-class="text-text-primary font-semibold">Now</router-link>
            </li>
          </ul>
          <button
            @click="toggleTheme"
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:bg-bg-muted"
            aria-label="Toggle theme"
          >
            <!-- Moon icon (to switch to dark) when in light mode -->
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <!-- Sun icon (to switch to light) when in dark mode -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>

    <main class="container flex-grow pt-0 pb-16">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="pt-12 pb-16 border-t border-border-subtle text-sm text-text-secondary mt-18">
      <div class="container">
        <p class="mb-1">© 2025 — This site documents my work and thinking around software systems.</p>
        <p class="text-text-secondary">
          Open to senior full-stack web engineering roles —
          <a href="mailto:info@bayuaksana.com">info@bayuaksana.com</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

const route = useRoute()
const isDark = ref(false)
const isRestoring = ref(false)

// Toggle between light and dark themes by updating a root class
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const handleScroll = useDebounceFn(() => {
  if (route.fullPath && !isRestoring.value) {
    sessionStorage.setItem(`scroll-pos-${route.fullPath}`, window.scrollY.toString())
  }
}, 100)

// Watch for route changes to handle restoration period
watch(() => route.fullPath, () => {
  isRestoring.value = true
  // Wait for the transition and scroll restoration to complete
  // scrollBehavior has a 250ms delay, so we wait a bit longer to avoid overwriting with 0
  setTimeout(() => {
    isRestoring.value = false
  }, 500)
})

// Initialize theme based on user system preference or local storage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    document.documentElement.classList.toggle('dark', prefersDark)
  }

  // Handle initial scroll restoration protection
  isRestoring.value = true
  setTimeout(() => {
    isRestoring.value = false
  }, 500)

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
