<template>
  <Splitpanes class="default-theme">
    <Pane :size="uiStore.layout.explorerSize">
      <ScrollPanel>
        <WriterPanesExplorer />
      </ScrollPanel>
    </Pane>
    <Pane :size="uiStore.layout.editorSize">
      <!-- <WriterBreadcrumb /> -->

      <WriterPanesOfferSampleDoc />

      <!-- No ScrollPanel due to problematic CM behaviour. See component for details. -->
      <!-- <ScrollPanel> -->
      <WriterPanesEditor />
      <!-- </ScrollPanel> -->
    </Pane>
    <Pane :size="uiStore.layout.previewSize">
      <ScrollPanel>
        <WriterPanesPreview />
      </ScrollPanel>
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
