import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'timeline',
      component: () => import('@/pages/TimelinePage.vue'),
    },
    {
      path: '/posts/new',
      name: 'post-create',
      component: () => import('@/pages/PostCreatePage.vue'),
    },
  ],
})

export default router
