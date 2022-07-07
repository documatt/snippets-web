import log from 'loglevel'
import { attemptTo, crc32 } from '@/utils'

import { documentApi } from '@/api'

/**
 * @typedef {number} Crc
 */

export default {
  namespaced: true,

  state: () => ({
    /** @type {string} */
    currentId: '',
    /** @type {string} */
    currentBody: '',
    /** @type Crc */
    currentCrc: undefined,

    isSaving: false,

    /** Dirty document has unsaved changes */
    isDirty: false,

    /** @type {string} */
    previewHtml: '',
    /** @type {Crc} */
    previewCrc: undefined,
    previewIsFailed: false,
    previewInProgress: false
  }),

  mutations: {
    setCurrentId (state, id) {
      state.currentId = id
    },

    setCurrentBody (state, body) {
      state.currentBody = body
    },

    /**
     *
     * @param state
     * @param {Crc} crc
     */
    setCurrentCrc (state, crc) {
      state.currentCrc = crc
    },

    setIsSaving (state, isSaving) {
      state.isSaving = isSaving
    },

    setIsDirty(state, isDirty) {
      state.isDirty = isDirty
    },

    /**
     *
     * @param state
     * @param {Crc} crc
     */
    setPreviewCrc (state, crc) {
      state.previewCrc = crc
    },

    setPreviewHtml (state, html) {
      state.previewHtml = html
    },

    setPreviewIsFailed (state, isFailed) {
      state.previewIsFailed = isFailed
    },

    setPreviewInProgress (state, inProgress) {
      state.previewInProgress = inProgress
    }
  },

  getters: {
    isBodyEmpty: state => state.currentBody === ''
  },

  actions: {

    async saveAndSetBody ({ state, rootState, commit, dispatch }, { body }) {
      log.trace(`Saving ${body.length} long document`)
      commit('setIsSaving', true)
      commit('setIsDirty', true)

      try {
        await documentApi.updateDocument(rootState.book.currentId, state.currentId, body)
        await dispatch('setDocument', { id: state.currentId, body })
        commit('setIsDirty', false)

      } finally {
        commit('setIsSaving', false)
      }
    },

    async setDocument ({ commit }, { id, body }) {
      const crc = crc32(body)
      log.trace(`Setting ${body.length} long document with CRC ${crc}`)
      commit('setCurrentId', id)
      commit('setCurrentBody', body)
      commit('setCurrentCrc', crc)
    },

    /** Initiate document preview, set preview body */
    async tryPreview ({ state, commit, dispatch }) {
      log.trace('Trying preview')

      // - ukládá se právě?
      //   - ano, ukládá se -> čekej na dokončení, pak nový náhled -> x
      //   - ne, neukládá se -> existuje již náhled pro toto body?
      //     - ano, existuje -> nic nedělej -> x
      //     - ne, neexistuje -> vytvoř nový -> x

      if (state.isSaving) {
        log.trace('Saving a document in progress, wait till saved')
        await attemptTo('wait till saved', async () => {}, async () => !state.isSaving, 5, 500)

        if (state.isSaving) {
          log.error('Saving takes too long, ignoring initiating preview')
          commit('setPreviewIsFailed', true)
          return
        }

        await dispatch('getAndSetPreview')
        return
      }

      if (state.currentCrc !== state.previewCrc) {
        log.trace('No preview yet, or stale preview')
        await dispatch('getAndSetPreview')
        return
      }

      log.trace('Preview is up-to-date with the document. Ignoring preview request.')
    },

    /**
     * Get a fresh preview (no matter of state) and set it.
     *
     * @param state
     * @param rootState
     * @param commit
     * @return {Promise<void>}
     */
    async getAndSetPreview ({ state, rootState, getters, commit }) {
      log.trace('Forcing a fresh preview')

      if (getters.isBodyEmpty) {
        log.trace('Ignoring because of empty body')
        return
      }

      commit('setPreviewInProgress', true)

      try {
        const job = await documentApi.initiatePreview(rootState.book.currentId, state.currentId)
        const job_id = job.job_id

        // Attempt to get preview
        const operation = async () => await documentApi.getPreviewBody(rootState.book.currentId, state.currentId, job_id)
        const isDone = async (val) => val !== null
        const html = await attemptTo('get preview', operation, isDone, 3, 500)

        if (!await isDone(html)) {
          commit('setPreviewIsFailed', true)
          return
        }

        const crc = crc32(state.currentBody)
        log.trace(`Got ${html.length} long preview for a document with CRC ${crc}`)
        commit('setPreviewHtml', html)
        commit('setPreviewIsFailed', false)
        commit('setPreviewCrc', crc)

      } finally {
        commit('setPreviewInProgress', false)
      }
    }
  }
}


