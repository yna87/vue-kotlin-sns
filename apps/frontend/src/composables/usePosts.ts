import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { PostCreateFormData } from '@/schemas/post'
import { useApi } from './useApi'

export function usePostsQuery() {
  const { posts: postsApi } = useApi()

  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postsApi.getAll(),
  })
}

export function useCreatePostMutation() {
  const { posts: postsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: PostCreateFormData) => postsApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
