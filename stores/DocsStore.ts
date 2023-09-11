/**
 * Collection of book's documents.
 */

import { defineStore } from "pinia";
import { TreeNode } from "primevue/tree";
import { ref } from "vue";
import { useBookStore } from "./BookStore";

export const useDocsStore = defineStore("docs", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const bookStore = useBookStore();
  const { $api } = useNuxtApp();

  // ***************************************************************************
  // State
  // ***************************************************************************

  // Array of book's docs
  const docs = ref<Doc[]>([])

  // ***************************************************************************
  // Getters
  // ***************************************************************************


  // ***************************************************************************
  // Actions
  // ***************************************************************************

  async function loadAndSet() {
    logger.info("Loading collection of book's documents")
    docs.value = await $api.bookApi.getDocs(bookStore.id)
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return {
    docs, loadAndSet
  };
});
