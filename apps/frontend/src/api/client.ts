import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '../stores/auth'
import router from '../router'

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

/**
 * リクエストインターセプター
 * 認証トークンを自動的にAuthorizationヘッダーに付与
 */
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * レスポンスインターセプター
 * 401エラー時にログアウトしてログイン画面へリダイレクト
 */
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // 401エラーの場合はログアウトしてログイン画面へ
      const authStore = useAuthStore()
      authStore.logout()
      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  },
)

export type ApiClient = typeof apiClient
