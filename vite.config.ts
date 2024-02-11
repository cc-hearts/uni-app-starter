import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [uni(), UnoCSS()],
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
