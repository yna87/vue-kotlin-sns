<script setup lang="ts">
import { provideApi } from './composables/useApi'
import AppHeader from './components/AppHeader.vue'

provideApi()

const toaster = { position: 'top-center' } as const
</script>

<template>
  <UApp :toaster="toaster">
    <AppHeader />
    <UMain>
      <div class="mx-auto max-w-4xl px-4 py-8">
        <RouterView />
      </div>
    </UMain>
  </UApp>
</template>
