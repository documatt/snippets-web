import { mockedApi } from '@/plugins/api'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent } from 'vue'
import { useDocStore } from './DocStore'
import { usePreviewStore } from './PreviewStore'

test('refresh action called on body change in DocStore', () => {
  const TestComponent = defineComponent({
    template: '<h1>nothing</h1>',
    async setup() {
      const docStore = useDocStore()
      // 2 actions that should refresh preview
      await docStore.save()
      await docStore.loadAndSetBody('some-doc-id')

      const previewStore = usePreviewStore()
      await flushPromises()

      expect(previewStore.refresh).toBeCalledTimes(2)
    }
  })

  const SuspenseTestComponent = defineComponent({
    components: { TestComponent },
    template: '<Suspense><TestComponent/></Suspense>'
  })

  mount(SuspenseTestComponent, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
      // inject("api") will got mockedApi
      provide: {
        api: mockedApi
      }
    }
  })
})



// I cannot manage to replace previewStore._debouncedRefresh() with a mock.
// Even, if I expose _debouncedRefresh() as regular action, it not gots
// replaced as other actions.
// test('refresh action of non-previewable does nothing', () => {
//   const TestComponent = defineComponent({
//     template: '<h1>nothing</h1>',
//     setup() {
//       const previewStore = usePreviewStore()
//       const docStore = useDocStore()

//       docStore.id = 'some.' // docStore.extension will become "xxx"
//       const spy = vi.spyOn(previewStore, "_debouncedRefresh")
//       previewStore.refresh()
//       expect(spy).toHaveBeenCalledTimes(1)
//     }
//   })
//   mount(TestComponent, {
//     global: {
//       plugins: [createTestingPinia({ stubActions: false })]
//     }
//   })
// })
