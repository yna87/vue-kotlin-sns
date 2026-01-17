import type { Meta, StoryObj } from '@storybook/vue3-vite'

import TimelinePage from './TimelinePage.vue'
import type { Post } from '@/types/post'
import { expect, fn, within } from 'storybook/test'
import { provideApi } from '@/composables/useApi'
import { provideRouterMock } from '@/composables/useRouterMock'
import { useAuthStore } from '@/stores/auth'

type CustomArgs = InstanceType<typeof TimelinePage> & {
  getPosts: () => Promise<Post[]>
  routerPush: ReturnType<typeof fn>
  isLoggedIn: boolean
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
          user: {
            id: 'user1',
            userName: 'timelineuser',
            displayName: 'タイムラインユーザー',
          },
        },
        {
          id: '2',
          content: 'Vue.jsとKotlinでSNSアプリを作成しています！',
          createdAt: new Date().toISOString(),
          user: {
            id: 'user2',
            userName: 'kotlinuser',
            displayName: 'Kotlinユーザー',
          },
        },
      ]
    }),
    routerPush: fn(),
    isLoggedIn: true,
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

      const authStore = useAuthStore()
      if (args.isLoggedIn) {
        authStore.login('fake-token', {
          id: 'user1',
          userName: 'timelineuser',
          displayName: 'タイムラインユーザー',
        })
      } else {
        authStore.logout()
      }

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
  args: {
    isLoggedIn: true,
  },
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

/**
 * ログインしていない場合のストーリー
 */
export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
  play: async ({ canvas, step }) => {
    await step('投稿するボタンが表示されていないことを確認', async () => {
      const postButton = canvas.queryByRole('button', { name: '投稿する' })
      await expect(postButton).not.toBeInTheDocument()
    })
  },
}
