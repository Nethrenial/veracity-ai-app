import 'vuesax-alpha/theme-chalk/index.css'
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'
import "~/assets/styles/main.scss"
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import Vuesax from 'vuesax-alpha'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => setupLayouts(routes),
})


const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(Vuesax)
app.use(pinia)
app.mount('#app')
