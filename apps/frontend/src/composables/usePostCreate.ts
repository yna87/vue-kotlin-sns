import axios from 'axios'
import type { Post } from '@/types/post'
import type { PostCreateFormData } from '@/schemas/post'
import { useApi } from './useApi'

export function usePostCreate() {
  const { posts: postsApi } = useApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const createPost = async (
    formData: PostCreateFormData,
  ): Promise<Post | null> => {
    isLoading.value = true
    error.value = null

    try {
      const post = await postsApi.create(formData)
      return post
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = '投稿の送信に失敗しました'
      } else {
        error.value = '予期しないエラーが発生しました'
      }
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    createPost,
  }
}
