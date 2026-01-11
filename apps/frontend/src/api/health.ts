import type { HealthResponse } from '@/types/health'
import { apiClient } from './client'

export const healthApi = {
  /**
   * ヘルスチェックAPIを呼び出す
   * @returns ヘルスチェック結果
   */
  getHealth: async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>('/health')
    return response.data
  },
}
