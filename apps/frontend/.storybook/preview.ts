import { setup, type Preview } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'
import ui from '@nuxt/ui/vue-plugin'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '../src/style.css'

setup((app) => {
  const pinia = createPinia()

  app.use(pinia)
  app.use(ui)
  app.use(VueQueryPlugin)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
