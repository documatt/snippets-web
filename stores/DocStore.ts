/**
 * Current document store.
 */

import { type Body, type DocId } from "@/utils/api";
import { useStorage } from "@vueuse/core";
import fileExtension from "file-extension";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useBookStore } from "./BookStore";
import { usePreviewStore } from "./PreviewStore";

export const useDocStore = defineStore("doc", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const bookStore = useBookStore();
  const previewStore = usePreviewStore();
  const { $api } = useNuxtApp();

  // ***************************************************************************
  // State
  // ***************************************************************************

  // Store and automatically update doc ID and body in LocalStorage
  const id = useStorage<DocId>("snippets.doc.id", null);
  const body = useStorage<Body>("snippets.doc.body", null);

  const isSaving = ref(false);

  // Body has unsaved changes
  const isDirty = ref(false);

  // ***************************************************************************
  // Getters
  // ***************************************************************************

  const extension = computed<string>(() => {
    // https://www.npmjs.com/package/file-extension
    return fileExtension(id.value);
  });

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  async function loadAndSetBody(docId: DocId) {
    id.value = docId
    body.value = await $api.docApi.getBody(bookStore.id, docId);
    await previewStore.refreshPreview();
  }

  async function save() {
    try {
      isSaving.value = true;
      isDirty.value = true;

      await $api.docApi.updateBody(bookStore.id, id.value, body.value);
      await previewStore.refreshPreview();

      // turn off dirty
      isDirty.value = false;
    } catch {
      // isDirty stays true
    } finally {
      isSaving.value = false;
      // isDirty stays true
    }
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return {
    id,
    extension,
    body,
    isSaving,
    isDirty,
    loadAndSetBody,
    save,
  };
});
