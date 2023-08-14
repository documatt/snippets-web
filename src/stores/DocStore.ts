import { DocApi, type DocId, type Body, type BookId } from "@/api";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const useDocStore = defineStore("doc", () => {
  // Store and automatically update current doc ID in LocalStorage
  const currentId = useStorage<DocId>("snippets.docId", null);

  const body = ref<Body>();

  async function loadAndSet(bookId: BookId, docId: DocId) {
    currentId.value = docId;
    body.value = await new DocApi(bookId, docId).getBody();
  }

  return { currentId, body, loadAndSet };
});