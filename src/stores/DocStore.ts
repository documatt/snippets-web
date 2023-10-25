/**
 * Current document store.
 */

import { type Body, type DocId } from "@/utils/snippetsApi";
import { useStorage } from "@vueuse/core";
import type { Api } from "@/plugins/api";
import { logger } from "@/utils/logger";
import { MdSyntax, RstSyntax, type Syntax } from "@/utils/editorSyntax";
// @ts-expect-error
import fileExtension from "file-extension";
import { defineStore } from "pinia";
import { computed, inject, ref } from "vue";
import { useBookStore } from "./BookStore";
import { usePreviewStore } from "./PreviewStore";

export const useDocStore = defineStore("doc", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const bookStore = useBookStore();
  const previewStore = usePreviewStore();
  const $api = inject("api") as Api

  // ***************************************************************************
  // State
  // ***************************************************************************

  // Store and automatically update doc ID in LocalStorage
  const id = useStorage<DocId>("snippets.doc.id", null);
  const body = ref<Body>();

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
    // ignore except for the initial call that will set body
    if ((docId === id.value) && (body.value)) {
      logger.trace("Ignoring attempt to DocStore.loadAndSetBody() for the same doc")
      return
    }

    id.value = docId
    body.value = await $api.docApi.getBody(bookStore.id, docId);
    await previewStore.refresh()
  }

  async function save() {
    try {
      isSaving.value = true;
      isDirty.value = true;

      await $api.docApi.updateBody(bookStore.id, id.value, body.value);
      await previewStore.refresh()

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
  // Editor syntax
  // ***************************************************************************

  /**
   * If `undefined`, this extension doesn't support editor syntax.
   */
  const editorSyntax = computed<Syntax | undefined>(() => {
    switch (extension.value) {
      case "rst":
        return RstSyntax
      case "md":
        return MdSyntax
      default:
        return undefined
    }
  })

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
    editorSyntax
  };
});
