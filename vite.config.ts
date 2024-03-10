import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts';
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({ compiler: 'vue3' }),
    VueRouter(),
    Layouts(),
    UnoCSS(),
    vue()
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
