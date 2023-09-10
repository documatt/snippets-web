<!-- UI around preview pane itself -->

<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import ScrollPanel from "primevue/scrollpanel";

import { useUIStore } from "~/stores/UIStore";

const uiStore = useUIStore();
</script>

<template>
  <div>
    <Toolbar>
      <template #end>
        <button
          class="p-sidebar-icon p-link mr-2"
          v-tooltip.bottom="'Widen preview sidebar'"
          @click="uiStore.changePreviewSize(1)"
          :disabled="uiStore.cannotWiderPreview"
        >
          <span class="pi pi-angle-double-left" />
        </button>
        <button
          class="p-sidebar-icon p-link mr-2"
          v-tooltip.bottom="'Narrow preview sidebar'"
          @click="uiStore.changePreviewSize(-1)"
          :disabled="uiStore.cannotNarrowPreview"
        >
          <span class="pi pi-angle-double-right" />
        </button>
      </template>
    </Toolbar>

    <ScrollPanel class="h-screen">
      <WriterPreviewPane />
    </ScrollPanel>
  </div>
</template>
