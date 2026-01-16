import {
  routerKey,
  routeLocationKey,
  createMemoryHistory,
  createRouter,
  type Router,
} from 'vue-router'

export interface RouterMethods {
  push: Router['push']
  replace: Router['replace']
  back: Router['back']
  forward: Router['forward']
}

/**
 * テスト用の Router コンテキストを提供する
 *
 * @param mock - 部分的にオーバーライドする Router メソッド
 *
 * @example
 * ```ts
 * import { fn } from 'storybook/test'
 * import { provideRouterMock } from '@/composables/useRouterMock'
 *
 * setup() {
 *   provideRouterMock({
 *     push: fn(),
 *   })
 * }
 * ```
 */
export function provideRouterMock(mock: Partial<RouterMethods> = {}): void {
  // createRouter で実際のルーターインスタンスを作成
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [],
  })

  // モックメソッドで上書き
  if (mock.push) {
    router.push = mock.push as typeof router.push
  }
  if (mock.replace) {
    router.replace = mock.replace as typeof router.replace
  }
  if (mock.back) {
    router.back = mock.back as typeof router.back
  }
  if (mock.forward) {
    router.forward = mock.forward as typeof router.forward
  }

  // Vue Router の Symbol キーを使って provide
  provide(routerKey, router)
  provide(routeLocationKey, shallowReactive(router.currentRoute.value))
}
