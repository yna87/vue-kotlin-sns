import axios from 'axios'
import type { HealthResponse } from '@/types/health'
import { useApi } from './useApi'

export function useHealthCheck() {
  const { health: healthApi } = useApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const healthData = ref<HealthResponse | null>(null)

  const isHealthy = computed(() => healthData.value?.status === 'healthy')

  const checkHealth = async () => {
    isLoading.value = true
    error.value = null
    healthData.value = null

    try {
      healthData.value = await healthApi.getHealth()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = 'Failed to fetch health status'
      } else {
        error.value = 'An unexpected error occurred'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    healthData,
    isHealthy,
    checkHealth,
  }
}
