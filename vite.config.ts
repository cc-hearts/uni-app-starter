import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), UnoCSS()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
})
