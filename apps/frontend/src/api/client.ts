import axios, { type AxiosInstance } from 'axios'

/**
 * Axiosインスタンス
 * 環境変数 VITE_API_BASE_URL でAPIのベースURLを指定
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export type ApiClient = typeof apiClient
