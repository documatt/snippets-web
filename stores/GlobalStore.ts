import { type EnginesInfo } from "@/utils/api";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { useBookStore } from "@/stores/BookStore";
import { useDocStore } from "@/stores/DocStore";

export const useGlobalStore = defineStore("global", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const { $api } = useNuxtApp();
  const bookStore = useBookStore();
  const docStore = useDocStore();

  // ***************************************************************************
  // State
  // ***************************************************************************

  const enginesInfo = ref<EnginesInfo>();

  const isPreviewPaneVisible = ref(false);

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  /**
   * Create initial state
   */
  async function init() {
    enginesInfo.value = await $api.queryApi.engines();
    await createOrLoadBookAndDoc();
  }

  /**
   * Decides whether to load+set the existing. Or, create+set a new book.
   */
  async function createOrLoadBookAndDoc() {
    if (bookStore.id && docStore.id) {
      // *** Load the existing one ***
      await bookStore.loadAndSet(bookStore.id);
      await docStore.loadAndSetBody();
    } else {
      // *** Create a new one ***
      // generate new UUID as bookId
      const newBookId = uuidv4();
      const engine = "SPHINX_530";
      const rootDocId = enginesInfo.value[engine].root_doc;

      // call api
      await $api.bookApi.create(newBookId, engine);

      // set book and doc state
      await bookStore.loadAndSet(newBookId);
      docStore.id = rootDocId;
      await docStore.loadAndSetBody();
    }
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return { enginesInfo, isPreviewPaneVisible, init };
});
