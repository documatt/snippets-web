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

// Init GlobalStore
const globalStore = useGlobalStore()
globalStore.init()
</script>

<style scoped>
</style>
