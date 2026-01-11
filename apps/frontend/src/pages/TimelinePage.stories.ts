import type { Meta, StoryObj } from '@storybook/vue3-vite'

import TimelinePage from './TimelinePage.vue'
import type { Post } from '@/types/post'
import { fn } from 'storybook/test'
import { provideApi } from '@/composables/useApi'

type CustomArgs = InstanceType<typeof TimelinePage> & {
  getPosts: () => Promise<Post[]>
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
  },
  render: (args) => ({
    components: { TimelinePage },
    setup() {
      provideApi({
        posts: {
          getAll: args.getPosts,
        },
      })

      return { args }
    },
    template: '<TimelinePage v-bind="args" />',
  }),
} satisfies Meta<CustomArgs>

export default meta
type Story = StoryObj<CustomArgs>

export const Basic: Story = {}
