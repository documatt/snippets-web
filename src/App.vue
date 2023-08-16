<script setup lang="ts">
import ConfirmDialog from "primevue/confirmdialog";
import ScrollTop from "primevue/scrolltop";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Toast from "primevue/toast";

import EditorTab from "./components/EditorTab.vue";
import PreviewTab from "./components/PreviewTab.vue";
import ShareTab from "./components/ShareTab.vue";

import { useGlobalStore } from "./stores/GlobalStore";

const globalStore = useGlobalStore();

globalStore.init();
</script>

<template>
  <!-- DOM placeholder for rendering toast popups -->
  <Toast></Toast>
  <!-- DOM placeholder for rendering confirm dialogs -->
  <ConfirmDialog></ConfirmDialog>

  <TabView>
    <TabPanel>
      <template #header>
        <i class="pi pi-pencil mr-2"></i>
        <span>Write</span>
      </template>
      <div class="grid">
        <div class="col-12 xl:col-8 xl:col-offset-2">
          <EditorTab />
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-eye mr-2"></i>
        <span>Preview</span>
      </template>
      <div class="grid">
        <div class="col-12 xl:col-8 xl:col-offset-2">
          <PreviewTab />
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-share-alt mr-2"></i>
        <span>Share</span>
      </template>
      <div class="grid">
        <div class="col-12 xl:col-8 xl:col-offset-2">
          <ShareTab />
        </div>
      </div>
    </TabPanel>
  </TabView>

  <ScrollTop />
</template>

<style scoped>
/* Center tab headers */
:deep(.p-tabview-nav) {
  justify-content: center;
}
/* Turn off too wide horizontal padding of tab panel (content) */
:deep(.p-tabview-panels) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
