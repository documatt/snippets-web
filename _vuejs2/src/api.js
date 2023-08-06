import Axios from 'axios'

import log from 'loglevel'
import NProgress from 'nprogress'

const axios = Axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api/v1',
});

// axios.interceptors.request.use(
//     config => {
//         return config
//     },
//     error => {
//         logger(ERROR_LEVEL, "REST API request error:", error);
//
//         Toast.open({
//             message: "REST API request error. See console for details.",
//             type: 'is-danger',
//             duration: 1000 * 5
//         });
//
//         throw error;
//     });
//
// axios.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         if (error.response) {
//             logger(ERROR_LEVEL, "REST API response error: the request was made but the server responded with a non 2xx status code. Data:", error.response.data, ", status:", error.response.status, ", headers:", error.response.headers);
//         } else if (error.request) {
//             // error.request is instance of XMLHttpRequest
//             logger(ERROR_LEVEL, "REST API response error: the request was made but no response was received.");
//         } else {
//             logger(ERROR_LEVEL,"REST API response error: something happened in setting up the request that triggered an error '" + error.message + "'.");
//         }
//
//         Toast.open({
//             message: "REST API response error. See console for details.",
//             type: 'is-danger',
//             duration: 1000 * 5
//         });
//
//         throw error;
//     });


// before a request is made start the nprogress
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  NProgress.done()
  return response
})


async function send(method, url, data = undefined) {
    if (data) {
        log.trace(`Sending API request ${method} ${url} with data`, data);
    } else {
        log.trace(`Sending API request ${method} ${url}`);
    }

    // no try-catch necessary, graceful error handling set in Axios interceptors above
    return await axios.request({
      method,
      url,
      data
    })
}

/**
 * @typedef {Object} Book - Documatt book.
 * @property {string} id - book ID, must be valid URL slug. E.g. "rst-demo1".
 */

/**
 * @typedef {Object} Document - Document in a book.
 * @property {string} id - document ID (e.g. "installing/database.rst")
 * @property {string} book_id - book ID to which the document belongs to
 */

/**
 * @typedef {Object} Job - Represents background job
 * @property {string} job_id - job UUID
 * @property {string} job_status - Possible job statuses are "queued" (waiting to be started), "started" (running), "deferred", "finished" (successfully finished), and "failed".
 */

export const bookApi = {
  /**
   *
   * @param {Book~id} bookId
   * @return {undefined}
   */
  async createBook (bookId) {
    await send('POST', '/book', {
      id: bookId
    })
  },

  /**
   *
   * @param {Book~id} bookId - book ID
   * @return {Book}
   */
  async getSingleBook (bookId) {
    return (await send('GET',`/book/${bookId}`)).data
  }
}

export const documentApi = {
  /**
   * @param {Book~id} bookId
   * @param {Document~id} documentId
   * @param {string} body by default empty string ('')
   * @return {undefined}
   */
  async createDocument (bookId, documentId, body = '') {
    await send('POST', `/book/${bookId}/document`, {
      id: documentId,
      body
    })
  },

  /**
   * Get document body.
   *
   * @param {Book~id} bookId
   * @param {Document~id} documentId
   * @return {string} Document body
   */
  async getDocumentBody (bookId, documentId) {
    // Axios will follow redirect to S3 automatically
    return (await send('GET', `/book/${bookId}/document/${documentId}`)).data
  }
  ,

  /**
   * Update body or ID
   *
   * @param {Book~id} bookId
   * @param {Document~id} documentId
   * @param {string} body
   */
  async updateDocument (bookId, documentId, body) {
    await send('PATCH', `/book/${bookId}/document/${documentId}`, {
      id: documentId,
      body
    })
  }
  ,

  /**
   * Initiates a preview, returns a job object.
   *
   * @param {Book~id} bookId - book ID
   * @param {Document~id} documentId
   * @return {Job}
   */
  async initiatePreview (bookId, documentId) {
    return (await send('POST', `/book/${bookId}/document/${documentId}/preview`)).data
  }
  ,

  /**
   * Get preview, if finished.
   *
   * @param {Book~id} bookId
   * @param {Document~id} documentId
   * @param {Job~job_id} jobId
   * @return {string} preview body or null if no preview exist
   */
  async getPreviewBody (bookId, documentId, jobId) {
    const resp = await send('GET', `/book/${bookId}/document/${documentId}/preview?${jobId}`)
    if (resp.status === 204) {
      return null   // preview not started/finished yet, or has failed
    } else {
      return resp.data
    }
  }
}

export const jobApi = {
  /**
   *
   * @param {Job~job_id} jobId
   * @return {Job}
   */
  async getJobStatus (jobId) {
    return (await send('GET', `/job/${jobId}`)).data
  }
}
