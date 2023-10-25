import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Inclusion of primeflex.scss this way allows [reusing classes](https://primeflex.org/installation#reuseclasses) with `@include stylecass` in both SFC and `assets/css/.scss`.
  // See https://nuxt.com/docs/getting-started/styling#using-preprocessors
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "primeflex/primeflex.scss" as *;'
      }
    }
  }
})
