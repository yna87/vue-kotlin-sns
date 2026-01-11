import { healthApi } from '@/api/health'
import { postsApi } from '@/api/posts'

export interface ApiContext {
  health: typeof healthApi
  posts: typeof postsApi
}

export const ApiContextKey: InjectionKey<ApiContext> = Symbol('ApiContext')

/**
 * APIコンテキストを提供する
 */
export function provideApi(mock?: Partial<ApiContext>): void {
  const context: ApiContext = {
    health: healthApi,
    posts: postsApi,
    ...mock,
  }
  provide(ApiContextKey, context)
}

/**
 * APIコンテキストを取得する
 */
export function useApi(): ApiContext {
  const api = inject(ApiContextKey)
  if (!api) {
    throw new Error('ApiContext is not provided')
  }
  return api
}
