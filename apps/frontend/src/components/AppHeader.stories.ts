import type { Meta, StoryObj } from '@storybook/vue3-vite'

import AppHeader from './AppHeader.vue'
import { expect, fn } from 'storybook/test'
import { useAuthStore } from '@/stores/auth'
import { provideRouterMock } from '@/composables/useRouterMock'

type CustomArgs = InstanceType<typeof AppHeader> & {
  routerPush: ReturnType<typeof fn>
  isLoggedIn: boolean
}

const meta = {
  title: 'components/AppHeader',
  component: AppHeader,
  args: {
    routerPush: fn(),
    isLoggedIn: true,
  },
  render: (args) => ({
    components: { AppHeader },
    setup() {
      const authStore = useAuthStore()
      if (args.isLoggedIn) {
        authStore.login('mock-jwt-token', {
          id: '1',
          userName: 'test_user',
          displayName: 'Test User',
        })
      } else {
        authStore.logout()
      }

      provideRouterMock({ push: args.routerPush })

      return { args }
    },
    template: '<AppHeader v-bind="args" />',
  }),
} satisfies Meta<CustomArgs>

export default meta
type Story = StoryObj<CustomArgs>

/**
 * ログイン状態のストーリー
 */
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
}

/**
 * ログアウト状態のストーリー
 */
export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
}

/**
 * ログインボタンをクリックすると、ログイン画面に遷移するストーリー
 */
export const ClickLoginButton: Story = {
  args: {
    isLoggedIn: false,
  },
  play: async ({ args, canvas, userEvent, step }) => {
    await step('ログインボタンをクリック', async () => {
      const loginButton = canvas.getByRole('button', { name: 'ログイン' })
      await userEvent.click(loginButton)
    })

    await step('ログイン画面に遷移することを確認', async () => {
      await expect(args.routerPush).toHaveBeenCalledWith({ name: 'login' })
    })
  },
}

/**
 * 登録ボタンをクリックすると、登録画面に遷移するストーリー
 */
export const ClickSignupButton: Story = {
  args: {
    isLoggedIn: false,
  },
  play: async ({ args, canvas, userEvent, step }) => {
    await step('登録ボタンをクリック', async () => {
      const signupButton = canvas.getByRole('button', { name: '登録' })
      await userEvent.click(signupButton)
    })

    await step('登録画面に遷移することを確認', async () => {
      await expect(args.routerPush).toHaveBeenCalledWith({ name: 'signup' })
    })
  },
}

/**
 * ログアウトボタンをクリックすると、ログアウトするストーリー
 */
export const ClickLogoutButton: Story = {
  args: {
    isLoggedIn: true,
  },
  play: async ({ args, canvas, userEvent, step }) => {
    await step('ログアウトボタンをクリック', async () => {
      const logoutButton = canvas.getByRole('button', { name: 'ログアウト' })
      await userEvent.click(logoutButton)
    })

    await step('ログアウトすることを確認', async () => {
      const authStore = useAuthStore()
      expect(authStore.isAuthenticated).toBe(false)
    })

    await step('タイムライン画面に遷移することを確認', async () => {
      await expect(args.routerPush).toHaveBeenCalledWith({ name: 'timeline' })
    })
  },
}
