<script setup lang="ts">
import { usePostsQuery } from '@/composables/usePosts'
import { useErrorMessage } from '@/composables/useErrorMessage'
import PostList from '@/components/PostList.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { isLoading, error, data: posts } = usePostsQuery()

useErrorMessage(error, '投稿の取得に失敗しました', { useToast: true })

const goToPostCreate = () => {
  router.push({ name: 'post-create' })
}
</script>

<template>
  <div class="space-y-6">
    <div
      v-if="authStore.isAuthenticated"
      class="flex justify-end"
    >
      <UButton @click="goToPostCreate"> 投稿する </UButton>
    </div>

    <PostList
      :posts="posts ?? []"
      :is-loading="isLoading"
    />
  </div>
</template>
