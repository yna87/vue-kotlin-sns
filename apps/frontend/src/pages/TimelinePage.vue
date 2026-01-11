<script setup lang="ts">
import { usePosts } from '@/composables/usePosts'
import PostList from '@/components/PostList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isLoading, error, posts, fetchPosts } = usePosts()

onMounted(() => {
  fetchPosts()
})

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
      v-if="posts"
      :posts="posts"
      :is-loading="isLoading"
      :error="error"
    />
  </div>
</template>
