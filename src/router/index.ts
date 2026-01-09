import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Systems from '../views/systems.vue'
import CaseStudies from '../views/case-studies.vue'
import VatChangeCase from '../views/case-studies/twin-v1/vat-change-case.vue'
import Skills from '../views/skills.vue'
import Now from '../views/now.vue'
import SectionContainer from '../views/section-container.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'About',
    component: SectionContainer
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
  },
  {
    path: '/writing',
    name: 'Writing',
    component: SectionContainer
  },
  {
    path: '/projects',
    name: 'Projects',
    component: SectionContainer
  },
  {
    path: '/uses',
    name: 'Uses',
    component: SectionContainer
  },
  {
    path: '/contact',
    name: 'Contact',
    component: SectionContainer
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const sectionRoutes = ['About', 'Writing', 'Projects', 'Uses', 'Contact'];
    if (to.name && from.name && sectionRoutes.includes(to.name as string) && sectionRoutes.includes(from.name as string)) {
      return false;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.hash) {
          resolve({ el: to.hash, behavior: 'smooth' });
        } else if (savedPosition) {
          resolve(savedPosition);
        } else {
          const storedPosition = sessionStorage.getItem(to.fullPath);
          if (storedPosition) {
            const position = JSON.parse(storedPosition);
            position.behavior = 'smooth';
            resolve(position);
          } else {
            resolve({ top: 0, behavior: 'auto' });
          }
        }
      }, 300);
    });
  },
})

router.beforeEach((_to, from, next) => {
  const scrollPosition = {
    top: window.scrollY,
    left: window.scrollX
  };
  sessionStorage.setItem(from.fullPath, JSON.stringify(scrollPosition));
  next();
});

export default router
