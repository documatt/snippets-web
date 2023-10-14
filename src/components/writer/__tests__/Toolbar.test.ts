import { it } from 'vitest'
import { mount } from '@vue/test-utils'
import Toolbar from '../Toolbar.vue'
import { createTestingPinia } from '@pinia/testing'
import { usePreviewStore } from '@/stores/PreviewStore'

it('hidden for not-previewable files', () => {
  const wrapper = mount(Toolbar, {
    global: {
      plugins: [createTestingPinia()]
    }
  })

  const previewStore = usePreviewStore()
  // @ts-expect-error
  previewStore.isPreviewable = false

  const buttons = wrapper.get('[data-testid="formatting-buttons"]')
  console.log(buttons)
})

// it("displayed for previewable files", () => {
//     const wrapper = mount(Toolbar)
//     wrapper.get('[data-testid="formatting-buttons"]')
// })
