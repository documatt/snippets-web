<script setup lang="ts">
import { useUIStore } from "~/stores/UIStore";

// We tried but [PrimeVue Splitter](https://primevue.org/splitter/) is very
// buggy, this is alternative
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const uiStore = useUIStore();
</script>

<template>
  <Splitpanes class="default-theme">
    <Pane :size="uiStore.layout.explorerSize">
      <WriterExplorer />
    </Pane>
    <Pane :size="uiStore.layout.editorSize">
      <WriterEditor />
    </Pane>
    <Pane :size="uiStore.layout.previewSize">
      <WriterPreviewUI />
    </Pane>
  </Splitpanes>
</template>

<style scroped>
/* Customize default Splitpanes theme */
.splitpanes.default-theme .splitpanes__pane {
  /* Reset default theme gray background */
  background: none;
}
</style>
