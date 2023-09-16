// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Only because SSR-incompatible nprogress.
  // https://nuxt.com/docs/guide/concepts/rendering#client-side-rendering
  // TODO: Find SSR-friendly alternative to nprogress
  ssr: false,
  devtools: { enabled: true },
  css: ["~/assets/css/main.scss"],
  build: {
    transpile: ["primevue"],
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt"],
  vite: {
    // Inclusion of primeflex.scss this way allows [reusing classes](https://primeflex.org/installation#reuseclasses) with `@include stylecass` in both SFC and `assets/css/.scss`.
    // See https://nuxt.com/docs/getting-started/styling#using-preprocessors
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "primeflex/primeflex.scss" as *;',
        },
      },
    },
    // Recommended Vitest settings from
    // https://vuejs.org/guide/scaling-up/testing.html#adding-vitest-to-a-project
    test: {
      // enable jest-like global test APIs
      globals: true,
      // simulate DOM with JSDOM
      environment: "jsdom"
    }
  },
  telemetry: false,
  runtimeConfig: {
    // Private keys are only available on the server

    // Public keys that are exposed to the client too
    // can be overridden by NUXT_PUBLIC_API_BASE_URL environment variable
    public: {
      // Default local Gunicorn port
      apiBaseUrl: "http://localhost:8000"
    }
  }
});
