import { jobApi } from '@/api'

export default {
  namespaced: true,

  state: () => ({}),

  mutations: {},

  actions: {
    /**
     * Get job status.
     *
     * @param {string} jobId
     * @return {string}
     */
    async getJobStatus (context, { jobId }) {
      const job = await jobApi.getJobStatus(jobId)
      return job.job_status
    }
  }
}
