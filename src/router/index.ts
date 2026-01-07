import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'
import Systems from '../views/systems.vue'
import CaseStudies from '../views/case-studies.vue'
import VatChangeCase from '../views/case-studies/twin-v1/vat-change-case.vue'
import Skills from '../views/skills.vue'
import Now from '../views/now.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/systems',
    name: 'Systems',
    component: Systems
  },
  {
    path: '/case-studies',
    name: 'CaseStudies',
    component: CaseStudies
  },
  {
    path: '/case-studies/twin-v1/handling-a-vat-increase-in-a-legacy-real-time-system',
    name: 'TwinV1Vat',
    component: VatChangeCase
  },
  {
    path: '/skills',
    name: 'Skills',
    component: Skills
  },
  {
    path: '/now',
    name: 'Now',
    component: Now
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      // Wait for the page transition (fade out-in) to complete before scrolling
      // The transition duration is 0.2s, so we wait slightly longer
      setTimeout(() => {
        const savedScroll = sessionStorage.getItem(`scroll-pos-${to.fullPath}`)
        if (savedScroll) {
          resolve({ top: parseInt(savedScroll, 10) })
        } else if (savedPosition) {
          resolve(savedPosition)
        } else if (to.hash) {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          })
        } else {
          resolve({ top: 0 })
        }
      }, 250)
    })
  },
})

router.beforeEach((to, from, next) => {
  // Save scroll position of the current page before leaving
  if (from.name) {
    sessionStorage.setItem(`scroll-pos-${from.fullPath}`, window.scrollY.toString())
  }
  next()
})

export default router
