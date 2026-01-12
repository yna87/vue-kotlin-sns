<script setup lang="ts">
import { loginSchema, type LoginFormData } from '@/schemas/auth'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  isLoading: boolean
  submit: (data: LoginFormData) => void
  goToSignup: () => void
}>()

const state = reactive<LoginFormData>({
  userName: '',
  password: '',
})

const onSubmit = (event: FormSubmitEvent<LoginFormData>) => {
  props.submit(event.data)
}
</script>

<template>
  <UForm
    :schema="loginSchema"
    :state="state"
    class="space-y-6"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <UFormField
        label="ユーザー名"
        name="userName"
      >
        <UInput
          v-model="state.userName"
          type="text"
          placeholder="ユーザー名"
          class="w-full"
          :disabled="isLoading"
        />
      </UFormField>

      <UFormField
        label="パスワード"
        name="password"
      >
        <UInput
          v-model="state.password"
          type="password"
          placeholder="パスワード"
          class="w-full"
          :disabled="isLoading"
        />
      </UFormField>
    </div>

    <div>
      <UButton
        type="submit"
        color="primary"
        block
        :loading="isLoading"
      >
        ログイン
      </UButton>
    </div>

    <div class="text-center text-sm">
      <span class="text-gray-600">アカウントをお持ちでない方は</span>
      <UButton
        variant="link"
        color="info"
        :padded="false"
        @click="goToSignup"
      >
        新規登録
      </UButton>
    </div>
  </UForm>
</template>
