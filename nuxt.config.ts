// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/icon",
  ],
  css: ["~/assets/styles/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      link: [{ rel: "icon", href: "/images/snippets-icon.svg" }],
      // the rest SEO metas in app/app.vue
    },
  },
});
