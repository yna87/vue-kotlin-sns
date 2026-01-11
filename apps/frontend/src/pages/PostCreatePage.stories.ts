import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PostCreatePage from './PostCreatePage.vue'
import type { Post, PostCreateRequest } from '@/types/post'
import { expect, fn, within } from 'storybook/test'
import { provideApi } from '@/composables/useApi'
type CustomArgs = InstanceType<typeof PostCreatePage> & {
  createPost: (post: PostCreateRequest) => Promise<Post>
}

const meta = {
  title: 'pages/PostCreatePage',
  component: PostCreatePage,
  args: {
    createPost: fn(async (post: PostCreateRequest) => {
      return {
        id: '1',
        content: post.content,
        createdAt: new Date().toISOString(),
      }
    }),
  },
  render: (args) => ({
    components: { PostCreatePage },
    setup() {
      provideApi({
        posts: {
          create: args.createPost,
        },
      })
      return { args }
    },
    template: '<PostCreatePage v-bind="args" />',
  }),
} satisfies Meta<CustomArgs>

export default meta
type Story = StoryObj<CustomArgs>

export const Basic: Story = {}

/**
 * 投稿を作成するストーリー
 */
export const CreatePost: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('投稿内容を入力', async () => {
      const textarea = canvas.getByRole('textbox', { name: '投稿内容' })
      await userEvent.type(textarea, 'これは新しい投稿です。')
    })

    await step('投稿ボタンをクリック', async () => {
      const submitButton = canvas.getByRole('button', { name: '投稿する' })
      await userEvent.click(submitButton)
    })

    await step('API が呼び出されることを確認', async () => {
      await expect(args.createPost).toHaveBeenCalledOnce()
      await expect(args.createPost).toHaveBeenCalledWith({
        content: 'これは新しい投稿です。',
      })
    })
  },
}
