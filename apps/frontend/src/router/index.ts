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
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/SignupPage.vue'),
    },
  ],
})

export default router
