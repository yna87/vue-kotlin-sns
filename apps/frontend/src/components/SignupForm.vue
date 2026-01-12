<script setup lang="ts">
import { signupSchema, type SignupFormData } from '@/schemas/auth'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  isLoading: boolean
  submit: (data: SignupFormData) => void
  goToLogin: () => void
}>()

const state = reactive<SignupFormData>({
  userName: '',
  displayName: '',
  password: '',
})

const onSubmit = (event: FormSubmitEvent<SignupFormData>) => {
  props.submit(event.data)
}
</script>

<template>
  <UForm
    :schema="signupSchema"
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
          class="w-full"
          type="text"
          placeholder="ユーザー名（英数字とアンダースコア）"
          :disabled="isLoading"
        />
      </UFormField>

      <UFormField
        label="表示名"
        name="displayName"
      >
        <UInput
          v-model="state.displayName"
          class="w-full"
          type="text"
          placeholder="表示名"
          :disabled="isLoading"
        />
      </UFormField>

      <UFormField
        label="パスワード"
        name="password"
      >
        <UInput
          v-model="state.password"
          class="w-full"
          type="password"
          placeholder="パスワード（8文字以上）"
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
        登録する
      </UButton>
    </div>

    <div class="text-center text-sm">
      <span class="text-gray-600">アカウントをお持ちの方は</span>
      <UButton
        variant="link"
        color="info"
        :padded="false"
        @click="goToLogin"
      >
        ログイン
      </UButton>
    </div>
  </UForm>
</template>
