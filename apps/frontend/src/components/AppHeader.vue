<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

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
  </UHeader>
</template>
