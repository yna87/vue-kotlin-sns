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
      <div class="container mx-auto px-5 py-6">
        <div class="w-full mx-auto max-w-3xl">
          <RouterView />
        </div>
      </div>
    </UMain>
  </UApp>
</template>
