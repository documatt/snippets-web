import { type Body } from "@/utils/api";
import { useDebounceFn, useTimeoutPoll } from "@vueuse/core";
import { promiseTimeout } from "@vueuse/shared";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBookStore } from "./BookStore";
import { useDocStore } from "./DocStore";

export const usePreviewStore = defineStore("preview", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const bookStore = useBookStore();
  const docStore = useDocStore();
  const { $api } = useNuxtApp();

  // ***************************************************************************
  // State
  // ***************************************************************************

  const body = ref<Body>();
  const isInProgress = ref(false);
  const isInError = ref(false);

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  // *** Refresh actions *******************************************************

  // for external users. Debounce and handle errors.
  async function refreshPreview() {
    // TODO: Ignore if preview not displayed? But trigger when is.
    _debouncedRefreshPreviewFn();
  }

  // Prevens multiple executing
  const _debouncedRefreshPreviewFn = useDebounceFn(async () => {
    await _doPreview();
  }, 1000);

  // Raw preview. Doesn't handle error nor debounce.
  async function _doPreview() {
    isInProgress.value = true;
    const first = await $api.docApi.enqueuePreview(bookStore.id, docStore.id)
    const jobId = first.job_id;
    let attempts = 0;

    const { pause } = useTimeoutPoll(
      async () => {
        // wait before first attempt
        await promiseTimeout(500);
        attempts++;

        const job_status = (await $api.jobApi.getStatus(jobId)).job_status;
        logger.debug(`preview attempt ${attempts}: with status ${job_status}`);

        if (job_status == "failed") {
          logger.warn(`preview attempt ${attempts}: preview error`);
          isInProgress.value = false;
          isInError.value = true;
          pause();
          return;
        } else if (job_status == "finished") {
          logger.info(`preview attempt ${attempts}: preview succeeded`);
          body.value = await $api.docApi.getPreviewBody(bookStore.id, docStore.id, jobId);
          isInProgress.value = false;
          isInError.value = false;
          pause();
          return;
        } else {
          logger.debug(`preview attempt ${attempts}: will try again`);
        }

        if (attempts > 3) {
          // stop polling (also throwing will break the loop but with uncaught)
          logger.warn(
            `preview attempt ${attempts}: Won't try again. Max attemps exceeded`
          );
          pause();
        }
      },
      1500,
      { immediate: true }
    );
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return { body, isInProgress, isInError, refreshPreview };
});
