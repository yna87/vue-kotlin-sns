<script setup lang="ts">
import { provideApi } from './composables/useApi'

provideApi()
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-4xl mx-auto py-8 px-4">
        <RouterView />
      </div>
    </div>
  </UApp>
</template>
