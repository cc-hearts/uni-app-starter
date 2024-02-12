import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [uni(), UnoCSS(), UniPages()],
  define: {
    'process.env': {
      UNI_MODES: process.env.MODE_ENV || 'development',
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
})
