<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// 認証画面ではボタンを非表示
const AUTH_PAGES = ['login', 'signup']
const isAuthPage = computed(() =>
  route.name ? AUTH_PAGES.includes(route.name as string) : false
)

const logout = () => {
  authStore.logout()
  router.push({ name: 'timeline' })
}

const goToLogin = () => {
  router.push({ name: 'login' })
}

const goToSignup = () => {
  router.push({ name: 'signup' })
}
</script>

<template>
  <UHeader
    title="Vue Kotlin SNS"
    to="/"
    :toggle="false"
  >
    <template #right>
      <!-- 認証画面以外で表示 -->
      <template v-if="!isAuthPage">
        <!-- 未ログイン時 -->
        <div
          v-if="!authStore.isAuthenticated"
          class="flex gap-2"
        >
          <UButton
            variant="ghost"
            @click="goToLogin"
          >
            ログイン
          </UButton>
          <UButton @click="goToSignup"> 登録 </UButton>
        </div>

        <!-- ログイン済み時 -->
        <div
          v-else
          class="flex items-center gap-3"
        >
          <span class="text-sm font-medium">
            {{ authStore.user?.displayName }}
          </span>
          <UButton
            variant="ghost"
            @click="logout"
          >
            ログアウト
          </UButton>
        </div>
      </template>
    </template>
  </UHeader>
</template>
