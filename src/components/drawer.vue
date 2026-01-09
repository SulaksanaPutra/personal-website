<template>
  <aside
    class="fixed z-[60] md:z-30 left-0 h-screen w-64 bg-bg-main border-r border-border-subtle transition-transform duration-300 overflow-y-auto"
    :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
    :style="{ top: drawerTop, height: `calc(100vh - ${drawerTop})` }"
  >
    <nav class="p-6 pt-12 relative">
      <button
        type="button"
        @click="toggleDrawer"
        class="absolute top-4 right-4 md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-bg-muted"
        aria-label="Close menu"
      >
        ✕
      </button>

      <ul v-if="currentList.length" class="space-y-6">
        <DrawerItem
          v-for="(item, index) in currentList"
          :key="index"
          :item="item"
          :is-active="item.type === 'anchor' ? activeSection === item.id : undefined"
          @click="handleItemClick"
        />
      </ul>
      <div v-else class="p-4 text-text-secondary text-sm">
        <!-- Empty state or dummy text -->
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isDrawerOpen, activeSection, headerComponentRef, drawerTop } from '../store'
import DrawerItem, { DrawerItemData } from './drawer-item.vue'

const route = useRoute()

const systemsItems: DrawerItemData[] = [
  {
    type: 'anchor',
    id: 'system-laas',
    label: 'LAAS — Logistics as a Service',
    description: 'A customer-facing platform exposing logistics capabilities to external clients.',
    details: [
      { label: 'Architecture', text: 'Asynchronous proxy using queues to decouple external traffic from internal operations.' },
      { label: 'Outcome', text: 'Enabled new B2B/B2C business models while shielding internal systems.' }
    ],
    tags: ['Customer-facing', 'B2B', 'B2C']
  },
  {
    type: 'anchor',
    id: 'system-twin-v2-wms',
    label: 'Twin V2 — WMS',
    description: 'A standalone warehouse management system replacing legacy stock handling.',
    details: [
      { label: 'Architecture', text: 'Independent Go services with separate databases for correctness and scalability.' },
      { label: 'Outcome', text: 'Delivered a reliable SaaS foundation with safer data migration and improved accuracy.' }
    ],
    tags: ['Warehouse Management', 'Distribution', 'Logistics']
  },
  {
    type: 'anchor',
    id: 'system-twin-v2-fleet',
    label: 'Twin V2 — Fleet',
    description: 'A dedicated delivery domain isolating fleet and settlement workflows.',
    details: [
      { label: 'Architecture', text: 'Saga-style coordination and strict consistency checks for transaction safety.' },
      { label: 'Outcome', text: 'Reliable delivery execution with accurate settlement and safe upstream integration.' }
    ],
    tags: ['Logistics', 'Delivery Operations']
  },
  {
    type: 'anchor',
    id: 'system-twin-v1',
    label: 'Twin V1 — Legacy',
    description: 'The business-critical legacy monolith that unified fragmented distributor operations.',
    details: [
      { label: 'Context', text: 'Centralized operational backbone replacing paper-based workflows.' },
      { label: 'Outcome', text: 'Improved data consistency and enabled real-time visibility across the network.' }
    ],
    tags: ['Distribution', 'Inventory', 'Sales Operations']
  }
]

const caseStudiesItems: DrawerItemData[] = [
  {
    type: 'anchor',
    id: 'case-growth-platform',
    label: 'Growth Platform Migration',
    description: 'A case study on migrating a legacy growth platform to a modular architecture.',
    details: [
      { label: 'Focus', text: 'Reducing coupling while maintaining business continuity.' },
      { label: 'Result', text: 'Improved deployment speed and team autonomy.' }
    ],
    tags: ['Case Study', 'Architecture', 'Migration']
  }
]

const skillsItems: DrawerItemData[] = [
  {
    type: 'anchor',
    id: 'skill-backend-systems',
    label: 'Backend Systems',
    description: 'Core competencies in building scalable backend systems.',
    details: [
      { label: 'Stack', text: 'Go, Laravel, distributed systems.' },
      { label: 'Strength', text: 'Consistency, reliability, and clear domain boundaries.' }
    ],
    tags: ['Backend', 'Scalability']
  }
]

const nowItems: DrawerItemData[] = [
  {
    type: 'anchor',
    id: 'now-current-focus',
    label: 'Current Focus',
    description: 'What I am actively working on right now.',
    details: [
      { label: 'Theme', text: 'System design refinement and writing.' },
      { label: 'Goal', text: 'Sharpen architectural thinking and communication.' }
    ],
    tags: ['Now', 'Focus']
  }
]

const navItems: DrawerItemData[] = [
  {
    type: 'link',
    to: '/',
    label: 'About',
    description: 'Background, values, and professional summary'
  },
  {
    type: 'link',
    to: '/writing',
    label: 'Writing',
    description: 'Essays, notes, and long-form thoughts'
  },
  {
    type: 'link',
    to: '/projects',
    label: 'Projects',
    description: 'Short ideas, experiments, and drafts'
  },
  {
    type: 'link',
    to: '/uses',
    label: 'Uses',
    description: 'Tools, hardware, and software I use daily'
  },
  {
    type: 'link',
    to: '/contact',
    label: 'Contact',
    description: 'Ways to get in touch or collaborate'
  }
]

const routeLists: Record<string, DrawerItemData[]> = {
  '/systems': systemsItems, //drawer unique for this route state behavior
  '/case-studies': caseStudiesItems,
  '/skills': skillsItems,
  '/now': nowItems,
  '/': navItems, //drawer main state behavior
  '/writing': navItems, //drawer main state behavior
  '/projects': navItems, //drawer main state behavior
  '/uses': navItems, //drawer main state behavior
  '/contact': navItems //drawer main state behavior
}

const currentList = computed(() => routeLists[route.path] || [])

const drawerStateKeys: Record<string, string> = {
  '/systems': 'systemsDrawerOpen',
  '/case-studies': 'caseStudiesDrawerOpen',
  '/skills': 'skillsDrawerOpen',
  '/now': 'nowDrawerOpen'
}

const getDrawerStateKey = () => drawerStateKeys[route.path] || 'drawerOpen'

watch(
  () => route.path,
  () => {
    const key = getDrawerStateKey()
    const savedState = localStorage.getItem(key)

    // Restore route-specific drawer state; default to open on desktop, closed on mobile
    if (savedState !== null) {
      isDrawerOpen.value = savedState === 'true'
    } else {
      isDrawerOpen.value = window.innerWidth >= 768
      localStorage.setItem(key, isDrawerOpen.value.toString())
    }
  },
  { immediate: true }
)

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
  localStorage.setItem(getDrawerStateKey(), isDrawerOpen.value.toString())
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return

  const headerOffset = headerComponentRef.value?.headerRef?.offsetHeight || 0
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerOffset - 24

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })

  activeSection.value = id

  if (window.innerWidth < 768) {
    isDrawerOpen.value = false
    localStorage.setItem(getDrawerStateKey(), 'false')
  }
}

const handleItemClick = (item: DrawerItemData) => {
  if (item.type === 'anchor' && item.id) {
    scrollToSection(item.id)
  } else {
    handleDrawerLinkClick()
  }
}

const handleDrawerLinkClick = () => {
  if (window.innerWidth < 768) {
    isDrawerOpen.value = false
    localStorage.setItem(getDrawerStateKey(), 'false')
  }
}
</script>
