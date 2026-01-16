import { healthApi } from '@/api/health'
import { postsApi } from '@/api/posts'
import { authApi } from '@/api/auth'
import { merge } from 'es-toolkit'
import type { DeepPartial } from '@/types/utils'
import { injectLocal, provideLocal } from '@vueuse/core'

export interface ApiContext {
  health: typeof healthApi
  posts: typeof postsApi
  auth: typeof authApi
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
    auth: authApi,
  }

  const context = merge(defaultContext, mock)

  provideLocal(ApiContextKey, context)
}

/**
 * APIコンテキストを取得する
 */
export function useApi(): ApiContext {
  const api = injectLocal(ApiContextKey)
  if (!api) {
    throw new Error('ApiContext is not provided')
  }
  return api
}
