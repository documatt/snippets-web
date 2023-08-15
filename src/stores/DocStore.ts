import { DocApi, type DocId, type Body, type BookId, toastApiError } from "@/api";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";
import { useBookStore } from "./BookStore";
import { useToast } from "primevue/usetoast";

export const useDocStore = defineStore("doc", () => {
  const toast = useToast();
  const bookStore = useBookStore()

  // Store and automatically update current doc ID in LocalStorage
  const currentId = useStorage<DocId>("snippets.docId", null);

  const body = ref<Body>();

  const isSaving = ref(false);

  async function loadAndSetBody() {
    body.value = await new DocApi(bookStore.currentId, currentId.value).getBody();
  }

  async function save() {
    try {
      isSaving.value = true;
      await new DocApi(bookStore.currentId, currentId.value).updateBody(
        body.value
      )
    } catch {
      // TODO: je zachycená chyba posílána do Sentry? Případně jak to udělat?
      toastApiError(toast);
    } finally {
      isSaving.value = false;
    }
  }

  return { currentId, body, isSaving, loadAndSetBody, save };
});