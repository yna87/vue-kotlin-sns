<script setup lang="ts">
import { useCreatePostMutation } from '@/composables/usePosts'
import { useErrorMessage } from '@/composables/useErrorMessage'
import PostForm from '@/components/PostForm.vue'
import type { PostCreateFormData } from '@/schemas/post'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isPending, error, mutateAsync: createPost } = useCreatePostMutation()

useErrorMessage(error, '投稿の送信に失敗しました', { useToast: true })

const onSubmit = async (data: PostCreateFormData) => {
  try {
    await createPost(data)
    router.push({ name: 'timeline' })
  } catch {
    // エラーはuseErrorMessageのtoastで表示されるため何もしない
  }
}

const onCancel = () => {
  router.push({ name: 'timeline' })
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-900">投稿作成</h1>

    <PostForm
      :is-loading="isPending"
      :submit="onSubmit"
      :cancel="onCancel"
    />
  </div>
</template>
