import axios from 'axios'
import type { Post } from '@/types/post'
import { useApi } from './useApi'

export function usePosts() {
  const { posts: postsApi } = useApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const posts = ref<Post[]>([])

  const fetchPosts = async () => {
    isLoading.value = true
    error.value = null
    posts.value = []

    try {
      posts.value = await postsApi.getAll()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = '投稿の取得に失敗しました'
      } else {
        error.value = '予期しないエラーが発生しました'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    posts,
    fetchPosts,
  }
}
