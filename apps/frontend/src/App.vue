<script setup lang="ts">
import { provideApi } from './composables/useApi'
import { useCurrentUserQuery } from './composables/useAuth'
import AppHeader from './components/AppHeader.vue'

provideApi()

// アプリ起動時にトークンからユーザー情報を復元
useCurrentUserQuery()

const toaster = { position: 'top-center' } as const
</script>

<template>
  <UApp :toaster="toaster">
    <AppHeader />
    <UMain>
      <div class="container mx-auto px-4 py-6">
        <RouterView />
      </div>
    </UMain>
  </UApp>
</template>
