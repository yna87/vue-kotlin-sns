import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useApi } from './useApi'
import type { LoginFormData, SignupFormData } from '@/schemas/auth'

/**
 * ログインMutation
 */
export function useLoginMutation() {
  const { auth: authApi } = useApi()
  const authStore = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (formData: LoginFormData) => authApi.login(formData),
    onSuccess: (response) => {
      authStore.login(response.token, response.user)
      router.push({ name: 'timeline' })
    },
  })
}

/**
 * サインアップMutation
 */
export function useSignupMutation() {
  const { auth: authApi } = useApi()
  const authStore = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (formData: SignupFormData) => authApi.signup(formData),
    onSuccess: (response) => {
      authStore.login(response.token, response.user)
      router.push({ name: 'timeline' })
    },
  })
}
