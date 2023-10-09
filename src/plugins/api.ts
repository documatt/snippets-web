/**
 *
 * Usage:
 *
 * ```
 * const $api = inject("api") as Api
 * $api.bookApi.getAll()
 * ```
 */
import { logger } from '@/utils/logger'
import { type SendFn, BookApi, DocApi, JobApi, QueryApi, ShareApi } from '@/utils/snippetsApi'
import NProgress from 'nprogress'
import { $fetch, type FetchOptions } from 'ofetch'
import type { App } from 'vue'
import conf from '@/utils/conf'

export class Api {
  public queryApi
  public bookApi
  public docApi
  public jobApi
  public shareApi

  constructor(sendFn: SendFn) {
    this.queryApi = new QueryApi(sendFn)
    this.bookApi = new BookApi(sendFn)
    this.docApi = new DocApi(sendFn)
    this.jobApi = new JobApi(sendFn)
    this.shareApi = new ShareApi(sendFn)
  }
}

const mockSendFn: SendFn = async <T>(url: string, fetchOptions?: FetchOptions<'json'>) => {
  const header = `${fetchOptions?.method || 'GET'} ${url}`
  return Promise.resolve<T>(`i am only mock for the ${header}` as T)
}

export const mockedApi = new Api(mockSendFn)

export default {
  install: (app: App) => {
    const fetcher = $fetch.create({
      baseURL: conf.API_BASE_URL
    })

    /**
     * Centralize all API calls here to have unified NProgress and logging.
     */
    const realSendFn: SendFn = async <T>(url: string, fetchOptions?: FetchOptions<'json'>) => {
      const header = `${fetchOptions?.method || 'GET'} ${url}`

      try {
        logger.debug(`Sending API request ${header}`)
        NProgress.start()
        // Fire request with passed ofetch instance.
        return await fetcher<T>(url, fetchOptions)
      } catch (err) {
        logger.error(`API request ${header} failed`)
        throw Error('Our API has some troubles. It is not your fault.')
      } finally {
        NProgress.done()
      }
    }

    app.provide('api', new Api(realSendFn))
  }
}
