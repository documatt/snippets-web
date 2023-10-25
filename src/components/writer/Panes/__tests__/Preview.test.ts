import { mount } from '@vue/test-utils'
import Preview from '../Preview.vue'
import { test, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mockedApi } from '@/plugins/api'
import { useDocStore } from '@/stores/DocStore'
import { usePreviewStore } from '@/stores/PreviewStore'

test('blank doc error', () => {
  const pinia = createTestingPinia()
  const wrapper = mount(Preview, {
    global: {
      plugins: [pinia],
      provide: { api: mockedApi }
    }
  })

  // Previewable
  const previewStore = usePreviewStore(pinia)
  // @ts-ignore
  previewStore.isPreviewable = true

  // but empty
  const docStore = useDocStore(pinia)
  docStore.body = ''

  const msg = wrapper.get('[data-testid="error-message"]')

  expect(msg.text()).toBe('Nothing to preview')
})

test('not previewable error', () => {
  const pinia = createTestingPinia()
  const wrapper = mount(Preview, {
    global: {
      plugins: [pinia],
      provide: { api: mockedApi }
    }
  })
  const previewStore = usePreviewStore(pinia)
  // @ts-ignore
  previewStore.isPreviewable = true

  const msg = wrapper.get('[data-testid="error-message"]')

  expect(msg.text()).toBe('This file type is not previewable')
})
