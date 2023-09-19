import { type EnginesInfo } from "@/utils/api";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { useBookStore } from "@/stores/BookStore";
import { useDocStore } from "@/stores/DocStore";
import { logger } from "~/utils/logger";
import { useDocsStore } from "@/stores/DocsStore";

export const useGlobalStore = defineStore("global", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const { $api } = useNuxtApp();
  const bookStore = useBookStore();
  const docStore = useDocStore();
  const docsStore = useDocsStore();

  // ***************************************************************************
  // State
  // ***************************************************************************

  const enginesInfo = ref<EnginesInfo>();

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  /**
   * Create initial state
   */
  async function init() {
    enginesInfo.value = await $api.queryApi.engines();
    await createOrLoadBookAndDoc();
    await docsStore.loadAndSet();
  }

  /**
   * Decides whether to load+set the existing. Or, create+set a new book.
   */
  async function createOrLoadBookAndDoc() {
    const bookId = bookStore.id
    const docId = docStore.id

    if (bookId && docId) {
      // *** Load the existing one ***
      logger.info(`Loading existing book '${bookId}', doc '${docId}'`)
      await bookStore.loadAndSet(bookId);
      await docStore.loadAndSetBody(docId);

    } else {
      // *** Create a new one ***
      // generate new UUID as bookId
      const newBookId = uuidv4();
      const engine = "SPHINX_530";
      const rootDocId = enginesInfo.value[engine].root_doc;
      logger.info(`Creating new book '${newBookId}', doc '${rootDocId}'`)

      // call api
      await $api.bookApi.create(newBookId, engine);

      // set book and doc state
      await bookStore.loadAndSet(newBookId);
      await docStore.loadAndSetBody(rootDocId);
    }
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return { enginesInfo,init, };
});
