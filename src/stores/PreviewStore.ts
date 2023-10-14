import { type Body } from '@/utils/snippetsApi'
import { useDebounceFn, useTimeoutPoll } from '@vueuse/core'
import { promiseTimeout } from '@vueuse/shared'
import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import { useBookStore } from './BookStore'
import { useDocStore } from './DocStore'
import type { Api } from '@/plugins/api'
import { logger } from '@/utils/logger'
import { useUIStore } from './UIStore'

export const usePreviewStore = defineStore('preview', () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const bookStore = useBookStore()
  const docStore = useDocStore()
  const uiStore = useUIStore()
  const $api = inject('api') as Api

  // ***************************************************************************
  // State
  // ***************************************************************************

  const body = ref<Body>()
  const isInProgress = ref(false)
  const isInError = ref(false)

  // ***************************************************************************
  // Getters
  // ***************************************************************************

  // Previewable also hides/reveals toolbar accordingly
  const isPreviewable = computed(() => {
    switch (docStore.extension) {
      case 'rst':
      case 'md':
        return true

      default:
        return false
    }
  })

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  // *** Refresh actions *******************************************************

  /**
   * For external users. Debounced (preventing multiple executing).
   */
  const refresh = async () => {
    if (!uiStore.previewIsVisible) {
      logger.trace(`Ignoring attempt to refresh preview because preview pane is not visible`)
      return
    }

    if (!isPreviewable.value) {
      logger.info(`File extension '${docStore.extension}' is not previewable`)
      return
    }

    await _debouncedRefresh()
  }

  const _debouncedRefresh = useDebounceFn(async () => {
    await _refresh()
  }, 1000)

  /**
   * Raw preview. Doesn't debounce. Sets body and flags.
   */
  async function _refresh() {
    isInProgress.value = true
    const first = await $api.docApi.enqueuePreview(bookStore.id, docStore.id)
    const jobId = first.job_id
    let attempts = 0

    const { pause } = useTimeoutPoll(
      async () => {
        // wait before first attempt
        await promiseTimeout(1500)
        attempts++

        const job_status = (await $api.jobApi.getStatus(jobId)).job_status
        logger.debug(`preview attempt ${attempts}: with status ${job_status}`)

        if (job_status == 'failed') {
          logger.warn(`preview attempt ${attempts}: preview error`)
          isInProgress.value = false
          isInError.value = true
          pause()
          return
        } else if (job_status == 'finished') {
          logger.info(`preview attempt ${attempts}: preview succeeded`)
          body.value = await $api.docApi.getPreviewBody(bookStore.id, docStore.id, jobId)
          isInProgress.value = false
          isInError.value = false
          pause()
          return
        } else {
          logger.debug(`preview attempt ${attempts}: will try again`)
        }

        if (attempts > 3) {
          // stop polling (also throwing will break the loop but with uncaught)
          logger.warn(`preview attempt ${attempts}: Won't try again. Max attemps exceeded`)
          pause()
        }
      },
      1500,
      { immediate: true }
    )
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return { body, isInProgress, isInError, isPreviewable, refresh }
})
