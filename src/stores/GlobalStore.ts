import { BookApi, toastApiError, type EnginesInfo, QueryApi } from "@/api";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { useBookStore } from "@/stores/BookStore";
import { useDocStore } from "@/stores/DocStore";

export const useGlobalStore = defineStore("global", () => {
  const toast = useToast();
  const bookStore = useBookStore();
  const docStore = useDocStore();

  const enginesInfo = ref<EnginesInfo>();

  /**
   * Create initial state
   */
  async function init() {
    // All API calls in try-catch block
    try {
      enginesInfo.value = await QueryApi.engines();

      await createOrLoadBookAndDoc();
    } catch {
      // TODO: je zachycená chyba posílána do Sentry? Případně jak to udělat?
      toastApiError(toast);
    }
  }

  /**
   * Decides whether to load+set the existing. Or, create+set a new book.
   */
  async function createOrLoadBookAndDoc() {
    if (bookStore.currentId && docStore.currentId) {
      // *** Load the existing one ***
      await bookStore.loadAndSet(bookStore.currentId);
      await docStore.loadAndSetBody();
    } else {
      // *** Create a new one ***
      // generate new UUID as bookId
      const newBookId = uuidv4();
      const engine = "SPHINX_530";
      const rootDocId = enginesInfo.value[engine].root_doc;

      // call api
      await new BookApi(newBookId).create(engine);

      // set book and doc state
      await bookStore.loadAndSet(newBookId);
      docStore.currentId = rootDocId;
      await docStore.loadAndSetBody();
    }
  }

  return { enginesInfo, init };
});
