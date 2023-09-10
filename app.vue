<script setup lang="ts">
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import ConfirmDialog from "primevue/confirmdialog";
import ScrollTop from "primevue/scrolltop";
import Toast from "primevue/toast";
import { useGlobalStore } from "@/stores/GlobalStore";

const { texts } = useAppConfig();

useSeoMeta({
  title: "Documatt Snippets, reStructuredText online preview and editor",
  description:
    "Preview and edit reStructuredText files online with Sphinx and Docutils without installing it.",
});

const globalStore = useGlobalStore();

globalStore.init();
</script>

<template>
  <div>
    <header class="bottom-shadow">
      <LayoutHeader/>
    </header>

    <main class="container">
      <Writer2/>
    </main>

    <LayoutFooter />

    <ScrollTop />

    <!-- DOM placeholder for rendering toast popups -->
    <Toast />

    <!-- DOM placeholder for rendering confirm dialogs -->
    <ConfirmDialog />

    <LayoutCookieConsent />
  </div>
</template>
