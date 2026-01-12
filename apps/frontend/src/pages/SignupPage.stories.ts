import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SignupPage from './SignupPage.vue'
import { expect, fn, within } from 'storybook/test'
import { provideRouterMock } from '@/composables/useRouterMock'
import { provideApi } from '@/composables/useApi'
import type { authApi } from '@/api/auth'
import type { SignupRequest } from '@/types/auth'

type CustomArgs = InstanceType<typeof SignupPage> & {
  signup: typeof authApi.signup
  routerPush: ReturnType<typeof fn>
}

const meta = {
  title: 'pages/SignupPage',
  component: SignupPage,
  args: {
    signup: fn(async (request: SignupRequest) => ({
      token: 'mock-jwt-token',
      user: {
        id: '1',
        userName: request.userName,
        displayName: request.displayName,
      },
    })),
    routerPush: fn(),
  },
  render: (args) => ({
    components: { SignupPage },
    setup() {
      provideApi({
        auth: {
          signup: args.signup,
        },
      })
      provideRouterMock({
        push: args.routerPush,
      })
      return { args }
    },
    template: '<SignupPage v-bind="args" />',
  }),
} satisfies Meta<CustomArgs>

export default meta
type Story = StoryObj<CustomArgs>

export const Basic: Story = {}

/**
 * サインアップを実行するストーリー
 */
export const SubmitSignup: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('ユーザー名を入力', async () => {
      const userNameInput = canvas.getByRole('textbox', { name: 'ユーザー名' })
      await userEvent.type(userNameInput, 'test_user')
    })

    await step('表示名を入力', async () => {
      const displayNameInput = canvas.getByRole('textbox', { name: '表示名' })
      await userEvent.type(displayNameInput, 'Test User')
    })

    await step('パスワードを入力', async () => {
      const passwordInput = canvas.getByLabelText('パスワード')
      await userEvent.type(passwordInput, 'password123')
    })

    await step('サインアップボタンをクリック', async () => {
      const signupButton = canvas.getByRole('button', { name: '登録する' })
      await userEvent.click(signupButton)
    })

    await step('サインアップAPIが呼び出されることを確認', async () => {
      await expect(args.signup).toHaveBeenCalled()
    })

    await step('タイムラインページに遷移することを確認', async () => {
      await expect(args.routerPush).toHaveBeenCalledWith({ name: 'timeline' })
    })
  },
}

/**
 * ログインページへ遷移することを確認するストーリー
 */
export const GoToLogin: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('ログインボタンをクリック', async () => {
      const loginButton = await canvas.getByRole('button', { name: 'ログイン' })
      await userEvent.click(loginButton)
    })

    await step('ログインページに遷移することを確認', async () => {
      expect(args.routerPush).toHaveBeenCalledWith({ name: 'login' })
    })
  },
}
