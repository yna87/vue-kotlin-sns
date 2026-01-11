<script setup lang="ts">
import { postCreateSchema, type PostCreateFormData } from '@/schemas/post'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  isLoading: boolean
  submit: (data: PostCreateFormData) => void
  cancel: () => void
}>()

const state = reactive<PostCreateFormData>({
  content: '',
})

const onSubmit = (event: FormSubmitEvent<PostCreateFormData>) => {
  props.submit(event.data)
}
</script>

<template>
  <UForm
    :schema="postCreateSchema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="onSubmit"
  >
    <UFormField
      label="投稿内容"
      name="content"
    >
      <UTextarea
        v-model="state.content"
        class="w-full"
        :rows="6"
        placeholder="投稿内容を入力してください"
        :disabled="isLoading"
      />
    </UFormField>

    <div class="flex justify-end gap-3">
      <UButton
        color="neutral"
        variant="soft"
        :disabled="isLoading"
        @click="cancel"
      >
        キャンセル
      </UButton>
      <UButton
        color="primary"
        type="submit"
        :loading="isLoading"
      >
        投稿する
      </UButton>
    </div>
  </UForm>
</template>
