<template>
  <TheFrame>
    <RouterView/>
  </TheFrame>

  <!-- DOM placeholder for rendering toast popups -->
  <Toast />

  <!-- DOM placeholder for rendering confirm dialogs -->
  <ConfirmDialog />

  <CookieConsent />
</template>

<script setup lang="ts">
import TheFrame from "@/components/layout/TheFrame.vue"
import CookieConsent from "@/components/layout/CookieConsent.vue"

import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useGlobalStore } from '@/stores/GlobalStore'
import { useRouter } from "vue-router"
import { ERROR } from "./utils/routeNames"

// *** Error page *************************************************************

const router = useRouter()

// Use addEventListener("XXX") instead onXXX because it doesn't discard
// listeners from Sentry or other libs

// Vue errors (template, watcher, ...)
// app.config.errorHandler = (err, instance, info) => {
//   alert(`${err}, ${instance}, ${info}`)
// }

// Runtime non-Promise errors
addEventListener("error", () => {
  router.push({ name: ERROR })
})

// Unhandled rejected promises
addEventListener("unhandledrejection", () => {
  router.push({ name: ERROR })
})

// *** Init GlobalStore *******************************************************
const globalStore = useGlobalStore()
globalStore.init()
</script>

<style scoped>
</style>
