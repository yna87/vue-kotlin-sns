import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PostCard from './PostCard.vue'

const meta = {
  title: 'components/PostCard',
  component: PostCard,
  args: {
    post: {
      id: '1',
      content: 'これはサンプルの投稿です。',
      createdAt: new Date().toISOString(),
      user: {
        id: 'user1',
        userName: 'sampleuser',
        displayName: 'サンプルユーザー',
      },
    },
  },
  render: (args) => ({
    components: { PostCard },
    setup() {
      return { args }
    },
    template: '<PostCard v-bind="args" />',
  }),
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
