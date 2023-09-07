import { type BookId, type Book } from "@/utils/api";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const useBookStore = defineStore("book", () => {
  const { $api } = useNuxtApp()

  // Store and automatically update current book ID in LocalStorage
  const id = useStorage<BookId>("snippets.book.id", null);

  const currentBook = ref<Book>();

  async function loadAndSet(bookId: BookId) {
    id.value = bookId
    currentBook.value = await $api.bookApi.get(bookId)
  }

  return { id, currentBook, loadAndSet };
});