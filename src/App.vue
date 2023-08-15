<script setup lang="ts">
import ConfirmDialog from "primevue/confirmdialog";
import ScrollTop from "primevue/scrolltop";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Toast from "primevue/toast";

import EditorTab from "./components/EditorTab.vue";

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
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
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
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus.
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
