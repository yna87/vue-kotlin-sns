import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PostForm from './PostForm.vue'
import { expect, fn, within } from 'storybook/test'

const meta = {
  title: 'components/PostForm',
  component: PostForm,
  args: {
    isLoading: false,
    submit: fn(),
    cancel: fn(),
  },
  render: (args) => ({
    components: { PostForm },
    setup() {
      return { args }
    },
    template: '<PostForm v-bind="args" />',
  }),
} satisfies Meta<typeof PostForm>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

/**
 * フォームに入力して投稿ボタンをクリックしたときの動作を確認するストーリー
 */
export const SubmitForm: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('投稿内容を入力', async () => {
      const textarea = canvas.getByRole('textbox')
      await userEvent.type(textarea, 'これはテスト投稿です。')
    })

    await step('送信ボタンをクリック', async () => {
      const submitButton = canvas.getByRole('button', { name: '投稿する' })
      await userEvent.click(submitButton)
    })

    await step('submit が正しい内容で実行されることを確認', async () => {
      await expect(args.submit).toHaveBeenCalledWith({
        content: 'これはテスト投稿です。',
      })
    })
  },
}

/**
 * キャンセルボタンをクリックしたときの動作を確認するストーリー
 */
export const CancelButton: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('キャンセルボタンをクリック', async () => {
      const cancelButton = canvas.getByRole('button', { name: 'キャンセル' })
      await userEvent.click(cancelButton)
    })

    await step('cancel が実行されることを確認', async () => {
      await expect(args.cancel).toHaveBeenCalled()
    })
  },
}
