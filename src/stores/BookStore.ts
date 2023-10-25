import type { Api } from "@/plugins/api";
import { type Book, type BookId } from "@/utils/snippetsApi";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { inject, ref } from "vue";

export const useBookStore = defineStore("book", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  const $api = inject("api") as Api

  // ***************************************************************************
  // State
  // ***************************************************************************

  // Store and automatically update current book ID in LocalStorage
  const id = useStorage<BookId>("snippets.book.id", null);

  const currentBook = ref<Book>();

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  async function loadAndSet(bookId: BookId) {
    id.value = bookId
    currentBook.value = await $api.bookApi.get(bookId)
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return { id, currentBook, loadAndSet };
});