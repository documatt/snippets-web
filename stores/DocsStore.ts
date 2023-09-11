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

  /**  Array of TreeNodes as expected by Tree component */
  // https://primevue.org/tree/#api.tree.interfaces.TreeNode
  const treeNodes: Ref<TreeNode[]> = computed(() => {
    return docs.value.map((doc) => {
      return<TreeNode> {
        key: doc.id,
        label: doc.id,
        icon: "pi pi-file",
      }
    })
  })

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
    docs, loadAndSet, treeNodes
  };
});
