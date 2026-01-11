import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PostList from './PostList.vue'

const meta = {
  title: 'components/PostList',
  component: PostList,
  args: {
    posts: [
      {
        id: '1',
        content: 'これはサンプルの投稿です。',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        content: 'これは別のサンプル投稿です。',
        createdAt: new Date().toISOString(),
      },
    ],
    isLoading: false,
    error: null,
  },
  render: (args) => ({
    components: { PostList },
    setup() {
      return { args }
    },
    template: '<PostList v-bind="args" />',
  }),
} satisfies Meta<typeof PostList>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
