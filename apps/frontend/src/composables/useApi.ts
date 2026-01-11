import { healthApi } from '@/api/health'
export interface ApiContext {
  health: typeof healthApi
}

export const ApiContextKey: InjectionKey<ApiContext> = Symbol('ApiContext')

/**
 * APIコンテキストを提供する
 */
export function provideApi(mock?: Partial<ApiContext>): void {
  const context: ApiContext = {
    health: healthApi,
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
