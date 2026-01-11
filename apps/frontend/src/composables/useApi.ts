import { healthApi } from '@/api/health'
import { postsApi } from '@/api/posts'
import { merge } from 'es-toolkit'
import type { DeepPartial } from '@/types/utils'

export interface ApiContext {
  health: typeof healthApi
  posts: typeof postsApi
}

export const ApiContextKey: InjectionKey<ApiContext> = Symbol('ApiContext')

/**
 * APIコンテキストを提供する
 * @param mock - 部分的にオーバーライドするAPIメソッド（ネストされたオブジェクトも部分的にマージ）
 */
export function provideApi(mock: DeepPartial<ApiContext> = {}): void {
  const defaultContext: ApiContext = {
    health: healthApi,
    posts: postsApi,
  }

  const context = merge(defaultContext, mock)

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
