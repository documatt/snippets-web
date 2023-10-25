import { mockedApi } from '@/plugins/api'
import { logger } from '@/utils/logger'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { defineComponent } from 'vue'
import { useDocStore } from '../DocStore'

describe('loadAndSetBody action', () => {
  test('does nothing for the same doc', () => {
    const TestComponent = defineComponent({
      template: '<h1>nothing</h1>',
      async setup() {
        const spy = vi.spyOn(logger, 'trace')

        const docStore = useDocStore()
        docStore.id = 'foo.md'
        docStore.body = 'some-body'
        await docStore.loadAndSetBody('foo.md')
        await flushPromises()

        expect(spy).toHaveBeenCalledWith(
          'Ignoring attempt to DocStore.loadAndSetBody() for the same doc'
        )
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

  test('loads body if missing', () => {
    const TestComponent = defineComponent({
      template: '<h1>nothing</h1>',
      async setup() {
        const docStore = useDocStore()
        docStore.id = 'foo.md'
        await docStore.loadAndSetBody('foo.md')
        await flushPromises()

        expect(docStore.body).toBeTruthy()
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
})
