import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { User } from '../types/user'

const TOKEN_KEY = 'auth_token'

/**
 * 認証ストア
 *
 * JWTトークンとログイン状態の管理を行う
 */
export const useAuthStore = defineStore('auth', () => {
  // State
  const token = useLocalStorage<string | null>(TOKEN_KEY, null)
  const user = ref<User | null>(null)

  // Getters
  const isAuthenticated = computed(() => token.value !== null)

  /**
   * ログイン処理
   */
  function login(authToken: string, userData: User) {
    token.value = authToken
    user.value = userData
  }

  /**
   * ログアウト処理
   */
  function logout() {
    token.value = null
    user.value = null
  }

  /**
   * ユーザー情報を設定
   */
  function setUser(userData: User) {
    user.value = userData
  }

  return {
    // State
    token,
    user,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
    setUser,
  }
})
