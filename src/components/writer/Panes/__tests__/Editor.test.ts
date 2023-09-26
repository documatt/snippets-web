import { mount } from '@vue/test-utils'
import Editor from '../Editor.vue'
import { describe, test, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mockedApi } from '@/plugins/api'
import { useDocStore } from '@/stores/DocStore'
import { usePreviewStore } from '@/stores/PreviewStore'
import { logger } from '@/utils/logger'

describe.todo('CodeMirror onChange handler', () => {
  test("doesn't call save when switching docs", () => {
    const pinia = createTestingPinia()
    const spy = vi.spyOn(logger, 'trace')

    const wrapper = mount(Editor, {
      global: {
        plugins: [pinia],
        provide: { api: mockedApi }
      }
    })

    const docStore = useDocStore()
    docStore.id = "foo.md"
    docStore.body = "some body"

    // switch!

    docStore.id = "bar.md"

    expect(spy).toBeCalledWith("Ignoring editor onChanges between switching docs")
  })

  test.skip('does call save on change withing the same doc', () => {})
})
