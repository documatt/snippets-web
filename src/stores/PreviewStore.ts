import { DocApi, JobApi, toastApiError, type Body } from "@/api";
import { useDebounceFn, useTimeoutPoll } from "@vueuse/core";
import { promiseTimeout } from "@vueuse/shared";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useBookStore } from "./BookStore";
import { useDocStore } from "./DocStore";

export const usePreviewStore = defineStore("preview", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const toast = useToast();
  const bookStore = useBookStore();
  const docStore = useDocStore();

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
    _debouncedRefreshPreviewFn();
  }

  // Prevens multiple executing
  const _debouncedRefreshPreviewFn = useDebounceFn(async () => {
    await _handleErrorsInPreview();
  }, 1000);

  async function _handleErrorsInPreview() {
    try {
      await _doPreview();
    } catch {
      // TODO: je zachycená chyba posílána do Sentry? Případně jak to udělat?
      toastApiError(toast);
    }
  }

  // Raw preview. Doesn't handle error nor debounce.
  async function _doPreview() {
    isInProgress.value = true;
    const docApi = new DocApi(bookStore.id, docStore.id);
    const first = await docApi.enqueuePreview();
    const jobId = first.job_id;
    let attempts = 0;

    const { pause } = useTimeoutPoll(
      async () => {
        // wait before first attempt
        await promiseTimeout(500);
        attempts++;

        const job_status = (await JobApi.getStatus(jobId)).job_status;
        console.log(`preview attempt ${attempts}: with status ${job_status}`);

        if (job_status == "failed") {
          console.log(`preview attempt ${attempts}: preview error`);
          isInProgress.value = false;
          isInError.value = true;
          pause();
          return;
        } else if (job_status == "finished") {
          console.log(`preview attempt ${attempts}: preview succeeded`);
          body.value = await docApi.getPreviewBody(jobId);
          isInProgress.value = false;
          isInError.value = false;
          pause();
          return;
        } else {
          console.log(`preview attempt ${attempts}: will try again`);
        }

        if (attempts > 3) {
          // stop polling (also throwing will break the loop but with uncaught)
          console.log(
            `preview attempt ${attempts}: Won't try again. Max attemps exceeded`
          );
          pause();
        }
      },
      1500,
      { immediate: true }
    );
  }

  return { body, isInProgress, isInError, refreshPreview };
});
