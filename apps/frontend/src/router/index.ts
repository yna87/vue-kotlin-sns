import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/SignupPage.vue'),
      meta: { guestOnly: true },
    },
  ],
})

// ナビゲーションガード
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // ログイン済みユーザーがゲスト専用ページ（login, signup）にアクセスした場合
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    next({ name: 'timeline' })
    return
  }

  // 認証が必要なページに未認証ユーザーがアクセスした場合
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router
