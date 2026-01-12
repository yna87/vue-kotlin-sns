import type { Meta, StoryObj } from '@storybook/vue3-vite'

import LoginForm from './LoginForm.vue'
import { fn } from 'storybook/test'

const meta = {
  title: 'components/LoginForm',
  component: LoginForm,
  args: {
    isLoading: false,
    submit: fn(),
    goToSignup: fn(),
  },
  render: (args) => ({
    components: { LoginForm },
    setup() {
      return { args }
    },
    template: '<LoginForm v-bind="args" />',
  }),
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
