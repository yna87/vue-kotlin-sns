import type { Meta, StoryObj } from '@storybook/vue3-vite'

import TimelinePage from './TimelinePage.vue'
import type { Post } from '@/types/post'
import { expect, fn, within } from 'storybook/test'
import { provideApi } from '@/composables/useApi'
import { provideRouterMock } from '@/composables/useRouterMock'

type CustomArgs = InstanceType<typeof TimelinePage> & {
  getPosts: () => Promise<Post[]>
  routerPush: ReturnType<typeof fn>
}

const meta = {
  title: 'pages/TimelinePage',
  component: TimelinePage,
  args: {
    getPosts: fn(async () => {
      return [
        {
          id: '1',
          content: 'これはTimelinePageのサンプル投稿コンテンツです。',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          content: 'Vue.jsとKotlinでSNSアプリを作成しています！',
          createdAt: new Date().toISOString(),
        },
      ]
    }),
    routerPush: fn(),
  },
  render: (args) => ({
    components: { TimelinePage },
    setup() {
      provideApi({
        posts: {
          getAll: args.getPosts,
        },
      })
      provideRouterMock({
        push: args.routerPush,
      })

      return { args }
    },
    template: '<TimelinePage v-bind="args" />',
  }),
} satisfies Meta<CustomArgs>

export default meta
type Story = StoryObj<CustomArgs>

export const Basic: Story = {}

/**
 * 投稿作成ページへ遷移するストーリー
 */
export const NavigateToPostCreate: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('投稿するボタンをクリック', async () => {
      const postButton = canvas.getByRole('button', { name: '投稿する' })
      await userEvent.click(postButton)
    })

    await step('投稿作成ページへ遷移することを確認', async () => {
      await expect(args.routerPush).toHaveBeenCalledOnce()
      await expect(args.routerPush).toHaveBeenCalledWith({
        name: 'post-create',
      })
    })
  },
}
