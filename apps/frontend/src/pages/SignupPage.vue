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
  <UCard class="max-w-lg mx-auto mt-16 p-8">
    <div class="space-y-6">
      <h1 class="text-2xl text-center font-bold text-gray-900">新規登録</h1>

      <SignupForm
        :is-loading="isPending"
        :submit="onSubmit"
        :go-to-login="goToLogin"
      />
    </div>
  </UCard>
</template>
