<script setup lang="ts">
import { usePostsQuery } from '@/composables/usePosts'
import { useErrorMessage } from '@/composables/useErrorMessage'
import PostList from '@/components/PostList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isLoading, error, data: posts } = usePostsQuery()

useErrorMessage(error, '投稿の取得に失敗しました', { useToast: true })

const goToPostCreate = () => {
  router.push({ name: 'post-create' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">タイムライン</h1>
      <UButton @click="goToPostCreate"> 投稿する </UButton>
    </div>

    <PostList
      :posts="posts ?? []"
      :is-loading="isLoading"
    />
  </div>
</template>
