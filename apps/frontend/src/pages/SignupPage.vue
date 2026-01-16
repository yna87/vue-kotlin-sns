<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSignupMutation } from '@/composables/useAuth'
import { useErrorMessage } from '@/composables/useErrorMessage'
import SignupForm from '@/components/SignupForm.vue'
import type { SignupFormData } from '@/schemas/auth'

const router = useRouter()

const { isPending, error, mutateAsync: signup } = useSignupMutation()
useErrorMessage(error, '登録に失敗しました', { useToast: true })

const onSubmit = async (data: SignupFormData) => {
  try {
    await signup(data)
  } catch {
    // エラーはToastで表示されるため何もしない
  }
}

const goToLogin = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h1 class="text-center text-3xl font-bold text-gray-900">
          サインアップ
        </h1>
      </div>

      <SignupForm
        :is-loading="isPending"
        :submit="onSubmit"
        :go-to-login="goToLogin"
      />
    </div>
  </div>
</template>
