import { uuid } from 'uuidv4'
import { MASTER_DOCUMENT_ID } from '@/consts'
import { bookApi, documentApi } from '@/api'

export default {
  namespaced: true,

  state: () => ({
    currentId: ''
  }),

  mutations: {
    setCurrentId (state, { id }) {
      state.currentId = id
    }
  },

  actions: {
    /**
     * Shortcut action that create snippet book (a book with only document with a special name), set it as current book, and returns new book and document IDs.
     *
     * @param dispatch
     * @returns {{bookId: string, documentId: string}}
     */
    async createAndSetSnippetBook ({ commit, dispatch }) {
      // Create book with random ID and first empty document
      const bookId = uuid()
      const documentId = MASTER_DOCUMENT_ID
      await bookApi.createBook(bookId)
      await documentApi.createDocument(bookId, documentId)

      // set book
      commit('setCurrentId', { id: bookId })
      // Set document
      await dispatch('document/setDocument', { id: documentId, body: '' }, { root: true })

      return { bookId, documentId }
    },

    /**
     * Load and set existing book and document
     */
    async loadAndSetSnippetBook ({ commit, dispatch }, { bookId, documentId }) {
      const body = await documentApi.getDocumentBody(bookId, documentId)
      //debugger

      // set book
      commit('setCurrentId', { id: bookId })
      // set document
      await dispatch('document/setDocument', { id: documentId, body }, { root: true })
    }
  }
}
