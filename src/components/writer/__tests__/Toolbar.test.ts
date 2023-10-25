import { usePreviewStore } from '@/stores/PreviewStore'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Toolbar from '../Toolbar.vue'

const formattingButtons = '[data-testid="formatting-buttons"]'
const changeLayoutButton = '[data-testid="change-layout-button"]'
const helpButton = '[data-testid="help-button"]'

describe('visibility depending on isPreviewable', () => {
  function _setPreviewable(isPreviewable: boolean) {
    const pinia = createTestingPinia()
    const previewStore = usePreviewStore()
    // @ts-expect-error
    previewStore.isPreviewable = isPreviewable

    return mount(Toolbar, {
      global: {
        plugins: [pinia],
      }
    })
  }

  it('hidden for not-previewable', () => {
    const wrapper = _setPreviewable(false)

    expect(wrapper.find(formattingButtons).exists()).toBe(false)
    expect(wrapper.find(changeLayoutButton).exists()).toBe(false)
    expect(wrapper.find(helpButton).exists()).toBe(false)
  })

  it('visible for previewable', () => {
    const wrapper = _setPreviewable(true)

    expect(wrapper.find(formattingButtons).exists()).toBe(true)
    expect(wrapper.find(changeLayoutButton).exists()).toBe(true)
    expect(wrapper.find(helpButton).exists()).toBe(true)
  })
})
