import Vue from 'vue'
import Vuex from 'vuex'
import book from './book'
import document from './document'
import job from './job'
import { LOCALSTORAGE_BOOK_ID, LOCALSTORAGE_DOCUMENT_ID } from '@/consts'
import log from 'loglevel'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    book,
    document,
    job
  }
});

export async function initGlobalState () {
  // *** Create or use existing book? **************************************
  const bookId = localStorage.getItem(LOCALSTORAGE_BOOK_ID)
  const documentId = localStorage.getItem(LOCALSTORAGE_DOCUMENT_ID)

  if (!bookId && !documentId) {
    await createSnippetBook()
  } else {
    await loadSnippetBookFromStorage(bookId, documentId)
  }
}

async function createSnippetBook () {
  log.trace('Creating new snippet book')
  let bookId, documentId;
  ({ bookId, documentId } = await store
    .dispatch('book/createAndSetSnippetBook', null))

  localStorage.setItem(LOCALSTORAGE_BOOK_ID, bookId)
  localStorage.setItem(LOCALSTORAGE_DOCUMENT_ID, documentId)
  log.trace(`Snippet book ${bookId} and document ${documentId} IDs saved to localStore`)
}

async function loadSnippetBookFromStorage (bookId, documentId) {
  log.trace(`Loading snippet book ${bookId} and document ${documentId} from localStore`)

  try {
    await store.dispatch('book/loadAndSetSnippetBook', {
      bookId,
      documentId
    })
  } catch (e) {
    // handle 404
    if ((e.response !== undefined) && (e.response.status === 404)) {
      log.info(`Snippet book ${bookId} from localStore not found on the remote site`)
      await createSnippetBook()
    } else {
      // but rethrow other errors
      throw e
    }
  }
}
