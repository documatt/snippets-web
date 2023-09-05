<script setup lang="ts">
import ConfirmDialog from "primevue/confirmdialog";
import ScrollTop from "primevue/scrolltop";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Toast from "primevue/toast";

import WriteTab from "./components/WriteTab.vue";
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
        <i class="pi pi-file-edit mr-2"></i>
        <span>Write</span>
      </template>
      <WriteTab />
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-file mr-2"></i>
        <span>Read</span>
      </template>
      <div class="grid">
        <div class="col-12 xl:col-8 xl:col-offset-2">
          ... reader here ...
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-file-export mr-2"></i>
        <span>Share</span>
      </template>
      <div class="grid">
        <div class="col-12 xl:col-8 xl:col-offset-2">
          <ShareTab />
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-wrench mr-2"></i>
        <span>Settings</span>
      </template>
      <div class="grid">
        <div class="col-12 xl:col-8 xl:col-offset-2">
          ... settings here ...
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
