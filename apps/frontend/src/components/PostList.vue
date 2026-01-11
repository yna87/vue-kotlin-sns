<script setup lang="ts">
import type { Post } from '@/types/post'
import PostCard from './PostCard.vue'

defineProps<{
  posts: Post[]
  isLoading: boolean
  error: string | null
}>()
</script>

<template>
  <div class="space-y-4">
    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      :title="error"
    />

    <div
      v-if="isLoading"
      class="text-center py-8"
    >
      <p class="text-gray-500">読み込み中...</p>
    </div>

    <div
      v-else-if="posts.length === 0 && !error"
      class="text-center py-8"
    >
      <p class="text-gray-500">投稿がまだありません</p>
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>
