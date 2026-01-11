import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ui from '@nuxt/ui/vue-plugin'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(ui)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
