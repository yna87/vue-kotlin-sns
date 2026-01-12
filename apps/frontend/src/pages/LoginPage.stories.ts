import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, fn, within } from 'storybook/test'
import { provideRouterMock } from '@/composables/useRouterMock'
import { provideApi } from '@/composables/useApi'
import LoginPage from './LoginPage.vue'
import type { LoginRequest } from '@/types/auth'
import type { authApi } from '@/api/auth'

type CustomArgs = InstanceType<typeof LoginPage> & {
  login: typeof authApi.login
  routerPush: ReturnType<typeof fn>
}

const meta = {
  title: 'pages/LoginPage',
  component: LoginPage,
  args: {
    login: fn(async (request: LoginRequest) => {
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          userName: request.userName,
          displayName: 'Test User',
        },
      }
    }),
    routerPush: fn(),
  },
  render: (args) => ({
    components: { LoginPage },
    setup() {
      provideApi({
        auth: {
          login: args.login,
        },
      })
      provideRouterMock({
        push: args.routerPush,
      })
      return { args }
    },
    template: '<LoginPage v-bind="args" />',
  }),
} satisfies Meta<CustomArgs>

export default meta
type Story = StoryObj<CustomArgs>

export const Basic: Story = {}

/**
 * ログインを実行するストーリー
 */
export const SubmitLogin: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('ユーザー名を入力', async () => {
      const userNameInput = canvas.getByRole('textbox', { name: 'ユーザー名' })
      await userEvent.type(userNameInput, 'test_user')
    })

    await step('パスワードを入力', async () => {
      const passwordInput = canvas.getByLabelText('パスワード')
      await userEvent.type(passwordInput, 'password123')
    })

    await step('ログインボタンをクリック', async () => {
      const loginButton = canvas.getByRole('button', { name: 'ログイン' })
      await userEvent.click(loginButton)
    })

    await step('ログインAPIが呼ばれることを確認', async () => {
      await expect(args.login).toHaveBeenCalledWith({
        userName: 'test_user',
        password: 'password123',
      })
    })

    await step('タイムラインページに遷移することを確認', async () => {
      await expect(args.routerPush).toHaveBeenCalledWith({ name: 'timeline' })
    })
  },
}

/**
 * サインアップページに遷移するストーリー
 */
export const GoToSignupPage: Story = {
  play: async ({ args, canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)

    await step('新規登録ボタンをクリック', async () => {
      const signupLink = canvas.getByRole('button', { name: '新規登録' })
      await userEvent.click(signupLink)
    })

    await step('サインアップページに遷移することを確認', async () => {
      await expect(args.routerPush).toHaveBeenCalledWith({ name: 'signup' })
    })
  },
}
