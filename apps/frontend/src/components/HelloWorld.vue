<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'
import type { HealthResponse } from '@/types/health'

defineProps<{
  checkHealth: () => Promise<void>
  msg: string
  healthData: HealthResponse | null
  isHealthy: boolean
  isLoading: boolean
  error: string | null
}>()

const { count, increment, decrement, reset } = useCounter()
</script>

<template>
  <div class="space-y-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold">{{ msg }}</h1>

    <!-- Health Check Section -->
    <div class="space-y-4 flex flex-col items-center w-full max-w-md">
      <h2 class="text-xl font-semibold">API Health Check</h2>

      <button
        :disabled="isLoading"
        class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        @click="checkHealth"
      >
        {{ isLoading ? 'Checking...' : 'Check Health' }}
      </button>

      <div
        v-if="error"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg w-full"
      >
        <p class="font-semibold">Error:</p>
        <p>{{ error }}</p>
      </div>

      <div
        v-if="healthData"
        class="p-4 rounded-lg w-full"
        :class="
          isHealthy
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
        "
      >
        <p class="font-semibold">Status: {{ healthData.status }}</p>
        <p class="text-sm">Timestamp: {{ healthData.timestamp }}</p>
      </div>
    </div>

    <!-- Counter Section -->
    <div class="space-y-4 flex flex-col items-center">
      <p class="text-lg">Count: {{ count }}</p>
      <div class="flex gap-2 justify-center">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          @click="increment"
        >
          +
        </button>
        <button
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          @click="decrement"
        >
          -
        </button>
        <button
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
