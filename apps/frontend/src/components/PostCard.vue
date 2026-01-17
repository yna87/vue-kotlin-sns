<script setup lang="ts">
import type { Post } from '@/types/post'

defineProps<{
  post: Post
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="border border-gray-200 shadow rounded-md p-3 space-y-4">
    <div>
      <p class="text font-bold text-gray-900">
        {{ post.user.displayName }}
      </p>
      <p class="text-sm text-gray-500">@{{ post.user.userName }}</p>
    </div>
    <p class="text-lg text-gray-900 whitespace-pre-wrap wrap-break-word">
      {{ post.content }}
    </p>
    <p class="text-sm text-gray-500">
      {{ formatDate(post.createdAt) }}
    </p>
  </div>
</template>
