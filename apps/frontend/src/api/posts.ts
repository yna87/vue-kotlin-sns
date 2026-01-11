import type { Post, PostCreateRequest } from '@/types/post'
import { apiClient } from './client'

export const postsApi = {
  /**
   * 投稿一覧を取得する
   */
  getAll: async (): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>('/posts')
    return response.data
  },

  /**
   * 投稿を作成する
   */
  create: async (request: PostCreateRequest): Promise<Post> => {
    const response = await apiClient.post<Post>('/posts', request)
    return response.data
  },
}
