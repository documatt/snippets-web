import { DocApi, toastApiError, type Body, type DocId } from "@/api";
import { useStorage } from "@vueuse/core";
import fileExtension from "file-extension";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { computed, ref } from "vue";
import { useBookStore } from "./BookStore";

export const useDocStore = defineStore("doc", () => {
  const toast = useToast();
  const bookStore = useBookStore();

  // Store and automatically update doc ID and body in LocalStorage
  const id = useStorage<DocId>("snippets.doc.id", null);
  const body = useStorage<Body>("snippets.doc.body", null);

  const isSaving = ref(false);

  // Body has unsaved changes
  const isDirty = ref(false);

  const extension = computed<string>(() => {
    // https://www.npmjs.com/package/file-extension
    return fileExtension(id.value);
  });

  async function loadAndSetBody() {
    body.value = await new DocApi(
      bookStore.id,
      id.value
    ).getBody();
  }

  async function save() {
    try {
      isSaving.value = true;
      isDirty.value = true;

      await new DocApi(bookStore.id, id.value).updateBody(
        body.value
      );

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

  return {
    id,
    extension,
    body,
    isSaving,
    isDirty,
    loadAndSetBody,
    save
  };
});
