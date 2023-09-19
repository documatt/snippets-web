<template>
  <Wrapper>
    <Writer/>
  </Wrapper>

  <!-- DOM placeholder for rendering toast popups -->
  <Toast />

  <!-- DOM placeholder for rendering confirm dialogs -->
  <ConfirmDialog />

  <CookieConsent />
</template>

<script setup lang="ts">
import Wrapper from "@/components/layout/Wrapper.vue"
import CookieConsent from "@/components/layout/CookieConsent.vue"

import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useGlobalStore } from '@/stores/GlobalStore'
import Writer from "./components/Writer.vue"

// Init GlobalStore
const globalStore = useGlobalStore()
globalStore.init()
</script>

<style scoped>
</style>
