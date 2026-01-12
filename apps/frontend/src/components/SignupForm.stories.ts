import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SignupForm from './SignupForm.vue'
import { fn } from 'storybook/test'

const meta = {
  title: 'components/SignupForm',
  component: SignupForm,
  args: {
    isLoading: false,
    submit: fn(),
    goToLogin: fn(),
  },
  render: (args) => ({
    components: { SignupForm },
    setup() {
      return { args }
    },
    template: '<SignupForm v-bind="args" />',
  }),
} satisfies Meta<typeof SignupForm>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
