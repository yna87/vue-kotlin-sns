import { expect, fn, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import HelloWorld from './HelloWorld.vue'

const meta = {
  title: 'Components/HelloWorld',
  component: HelloWorld,
  args: {
    checkHealth: fn(),
    msg: 'Welcome to Vue 3 + Vite',
    healthData: null,
    isHealthy: false,
    isLoading: false,
    error: null,
  },
  render: (args) => ({
    components: { HelloWorld },
    setup() {
      return { args }
    },
    template: '<HelloWorld v-bind="args" />',
  }),
} satisfies Meta<typeof HelloWorld>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

/**
 * ヘルスチェックボタンをテストするストーリー
 */
export const HealthCheck: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step(
      'ヘルスチェックボタンをクリックすると、checkHealth が実行されることを確認',
      async () => {
        const button = canvas.getByRole('button', { name: 'Check Health' })
        await userEvent.click(button)
        expect(args.checkHealth).toHaveBeenCalled()
      },
    )
  },
}

/**
 * カウンターをテストするストーリー
 */
export const Counter: Story = {
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    // ボタンを取得
    const incrementButton = canvas.getByRole('button', { name: '+' })
    const decrementButton = canvas.getByRole('button', { name: '-' })
    const resetButton = canvas.getByRole('button', { name: 'Reset' })

    await step('初期値が 0 であることを確認', async () => {
      const counterText = canvas.getByText('Count: 0')
      await expect(counterText).toBeInTheDocument()
    })

    await step(
      '+ ボタンをクリックするとカウンターが増加することを確認',
      async () => {
        await userEvent.click(incrementButton)
        await expect(canvas.getByText('Count: 1')).toBeInTheDocument()
      },
    )

    await step(
      'リセットボタンをクリックするとカウンターが 0 に戻ることを確認',
      async () => {
        await userEvent.click(resetButton)
        await expect(canvas.getByText('Count: 0')).toBeInTheDocument()
      },
    )

    await step(
      '- ボタンをクリックするとカウンターが減少することを確認',
      async () => {
        await userEvent.click(decrementButton)
        await expect(canvas.getByText('Count: -1')).toBeInTheDocument()
      },
    )
  },
}
