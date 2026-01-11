<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { useHealthCheck } from '@/composables/useHealthCheck'

const { isLoading, error, healthData, isHealthy, checkHealth } =
  useHealthCheck()

const onCheckHealth = async () => {
  await checkHealth()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <HelloWorld
      msg="Welcome to Vue Template"
      :check-health="onCheckHealth"
      :health-data="healthData"
      :is-healthy="isHealthy"
      :is-loading="isLoading"
      :error="error"
    />
  </div>
</template>
