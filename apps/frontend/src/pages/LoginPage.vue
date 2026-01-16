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
  <UCard class="max-w-lg mx-auto mt-16 p-8">
    <div class="space-y-6">
      <h1 class="text-2xl text-center font-bold text-gray-900">ログイン</h1>

      <LoginForm
        :is-loading="isPending"
        :submit="onSubmit"
        :go-to-signup="goToSignup"
      />
    </div>
  </UCard>
</template>
