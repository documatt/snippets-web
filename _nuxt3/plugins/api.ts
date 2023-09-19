/**
 * Backend API plugin.
 *
 * Based on [this blogpost](https://medium.com/@luizzappa/nuxt-3-repository-pattern-organising-and-managing-your-calls-to-apis-with-typescript-acd563a4e046).
 *
 * Example usage:
 *
 * ```
 * const { $api } = useNuxtApp()
 * const bookApi = new $api.BookApi("id").get()
 * ```
 *
 * Plugin creates fetcher based on runtime config and inject it to the
 * `utils/api.ts`.
 */

import { Api } from "~/utils/api";
import { $Fetch, FetchOptions } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetcher: $Fetch = $fetch.create({
    baseURL: config.public.apiBaseUrl
  })

  return {
    provide: {
      api: new Api(fetcher)
    },
  };
});