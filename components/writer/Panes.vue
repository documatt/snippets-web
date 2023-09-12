<template>
  <Splitpanes class="default-theme">
    <Pane :size="uiStore.layout.explorerSize">
      <WriterScrollPanel>
        <WriterExplorer />
      </WriterScrollPanel>
    </Pane>
    <Pane :size="uiStore.layout.editorSize">
      <WriterBreadcrumb />
      <WriterOfferSampleDoc />

      <WriterScrollPanel>
        <WriterEditor />
      </WriterScrollPanel>
    </Pane>
    <Pane :size="uiStore.layout.previewSize">
      <WriterScrollPanel>
        <WriterPreview />
      </WriterScrollPanel>
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import { useUIStore } from "~/stores/UIStore";

// We tried but [PrimeVue Splitter](https://primevue.org/splitter/) is very
// buggy, this is alternative
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const uiStore = useUIStore();
</script>

<style scroped>
/* Customize default Splitpanes theme */
.splitpanes.default-theme .splitpanes__pane {
  /* Reset default theme gray background */
  background: none;
}
</style>
