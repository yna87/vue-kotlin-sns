<script setup lang="ts">
import { usePostCreate } from '@/composables/usePostCreate'
import PostForm from '@/components/PostForm.vue'
import type { PostCreateFormData } from '@/schemas/post'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isLoading, error, createPost } = usePostCreate()

const onSubmit = async (data: PostCreateFormData) => {
  const post = await createPost(data)
  if (post) {
    router.push({ name: 'timeline' })
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
      :is-loading="isLoading"
      :error="error"
      :submit="onSubmit"
      :cancel="onCancel"
    />
  </div>
</template>
