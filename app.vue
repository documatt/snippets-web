<script setup lang="ts">
import ScrollTop from "primevue/scrolltop";
import Toast from "primevue/toast";
import ConfirmDialog from 'primevue/confirmdialog';
import { useGlobalStore } from "@/stores/GlobalStore";

useSeoMeta({
  title: "Documatt Snippets, reStructuredText online preview and editor",
  description:
    "Preview and edit reStructuredText files online with Sphinx and Docutils without installing it.",
});

// Init GlobalStore
const globalStore = useGlobalStore();
globalStore.init();
</script>

<template>
  <div>
    <LayoutWrapper>
      <Writer/>
    </LayoutWrapper>

    <ScrollTop />

    <!-- DOM placeholder for rendering toast popups -->
    <Toast />

    <!-- DOM placeholder for rendering confirm dialogs -->
    <ConfirmDialog />

    <LayoutCookieConsent />
  </div>
</template>
