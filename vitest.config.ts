import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // https://vitest.dev/config/#globals
      globals: true,
      server: {
        deps: {
          // Without the following testing Editor.vue causes
          // `TypeError: Unknown file extension ".css"`
          // https://github.com/rennzhang/codemirror-editor-vue3/issues/38
          inline: ["codemirror-editor-vue3"]
        }
      }
    }
  })
)
