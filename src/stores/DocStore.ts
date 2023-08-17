import { DocApi, JobApi, toastApiError, type Body, type DocId } from "@/api";
import { useStorage } from "@vueuse/core";
import fileExtension from "file-extension";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { computed, ref } from "vue";
import { useBookStore } from "./BookStore";
import { useTimeoutPoll } from "@vueuse/core";
import { promiseTimeout } from "@vueuse/shared";
import { useDebounceFn } from "@vueuse/core";

export const useDocStore = defineStore("doc", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const toast = useToast();
  const bookStore = useBookStore();

  // ***************************************************************************
  // State
  // ***************************************************************************

  // Store and automatically update doc ID and body in LocalStorage
  const id = useStorage<DocId>("snippets.doc.id", null);
  const body = useStorage<Body>("snippets.doc.body", null);
  const previewBody = ref<Body>();

  const isSaving = ref(false);

  const isPreviewInProgress = ref(false);
  const isPreviewInError = ref(false);

  // Body has unsaved changes
  const isDirty = ref(false);

  const extension = computed<string>(() => {
    // https://www.npmjs.com/package/file-extension
    return fileExtension(id.value);
  });

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  async function loadAndSetBody() {
    body.value = await new DocApi(bookStore.id, id.value).getBody();
    await _doPreview();
  }

  async function save() {
    try {
      isSaving.value = true;
      isDirty.value = true;

      await new DocApi(bookStore.id, id.value).updateBody(body.value);
      await _doPreview();

      // turn off dirty
      isDirty.value = false;
    } catch {
      // TODO: je zachycená chyba posílána do Sentry? Případně jak to udělat?
      toastApiError(toast);
      // isDirty stays true
    } finally {
      isSaving.value = false;
      // isDirty stays true
    }
  }

  // ***************************************************************************
  // Refresh actions
  // ***************************************************************************

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
    isPreviewInProgress.value = true;
    const docApi = new DocApi(bookStore.id, id.value);
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
          isPreviewInProgress.value = false;
          isPreviewInError.value = true;
          pause();
          return;
        } else if (job_status == "finished") {
          console.log(`preview attempt ${attempts}: preview succeeded`);
          previewBody.value = await docApi.getPreviewBody(jobId);
          isPreviewInProgress.value = false;
          isPreviewInError.value = false;
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

  return {
    id,
    extension,
    body,
    previewBody,
    isSaving,
    isDirty,
    isPreviewInProgress,
    isPreviewInError,
    loadAndSetBody,
    save,
    refreshPreview
  };
});
