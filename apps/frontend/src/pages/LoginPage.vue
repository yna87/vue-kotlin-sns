<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLoginMutation } from '@/composables/useAuth'
import { useErrorMessage } from '@/composables/useErrorMessage'
import LoginForm from '@/components/LoginForm.vue'
import type { LoginFormData } from '@/schemas/auth'

const router = useRouter()

const { isPending, error, mutateAsync: login } = useLoginMutation()
useErrorMessage(error, 'ログインに失敗しました', { useToast: true })

const onSubmit = async (data: LoginFormData) => {
  try {
    await login(data)
  } catch {
    // エラーはToastで表示されるため何もしない
  }
}

const goToSignup = () => {
  router.push({ name: 'signup' })
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h1 class="text-center text-3xl font-bold text-gray-900">ログイン</h1>
      </div>

      <LoginForm
        :is-loading="isPending"
        :submit="onSubmit"
        :go-to-signup="goToSignup"
      />
    </div>
  </div>
</template>
