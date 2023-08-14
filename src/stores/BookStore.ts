import { BookApi, type BookId, type Book } from "@/api";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const useBookStore = defineStore("book", () => {
  // Store and automatically update current book ID in LocalStorage
  const currentId = useStorage<BookId>("snippets.bookId", null);

  const currentBook = ref<Book>();

  async function loadAndSet(bookId: BookId) {
    currentId.value = bookId
    currentBook.value = await new BookApi(bookId).get()
  }

  return { currentId, currentBook, loadAndSet };
});