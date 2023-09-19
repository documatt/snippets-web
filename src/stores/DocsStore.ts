/**
 * Collection of book's documents.
 */

import { defineStore } from "pinia";
import { ref, inject } from "vue";
import { useBookStore } from "./BookStore";
import type { Api } from "@/plugins/api";
import type { Doc } from "@/utils/snippetsApi";
import { logger } from "@/utils/logger";

export const useDocsStore = defineStore("docs", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const bookStore = useBookStore();
  const $api = inject("api") as Api

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
