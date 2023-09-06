// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.scss"],
  build: {
    transpile: ["primevue"],
  },
  modules: ["@vueuse/nuxt"],
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
  },
  telemetry: false,
});
