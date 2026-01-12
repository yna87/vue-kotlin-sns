import { apiClient } from './client'
import type { AuthResponse, LoginRequest, SignupRequest } from '../types/auth'
import type { User } from '../types/user'

/**
 * 認証API
 */
export const authApi = {
  /**
   * ログイン
   */
  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', request)
    return response.data
  },

  /**
   * サインアップ
   */
  async signup(request: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', request)
    return response.data
  },

  /**
   * 現在のユーザー情報を取得
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  },
}
