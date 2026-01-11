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
  <UCard>
    <div class="space-y-2">
      <p class="text-gray-900 whitespace-pre-wrap break-words">
        {{ post.content }}
      </p>
      <p class="text-sm text-gray-500">
        {{ formatDate(post.createdAt) }}
      </p>
    </div>
  </UCard>
</template>
