<template>
  <Splitpanes class="default-theme">
    <Pane :size="uiStore.layout.explorerSize">
      <ScrollPanel>
        <Explorer />
      </ScrollPanel>
    </Pane>
    <Pane :size="uiStore.layout.editorSize">
      <!-- <WriterBreadcrumb /> -->

      <Toolbar />

      <OfferSampleDoc />

      <!-- No ScrollPanel due to problematic CM behaviour. See component for details. -->
      <!-- <ScrollPanel> -->
      <Editor />
      <!-- </ScrollPanel> -->
    </Pane>
    <Pane :size="uiStore.layout.previewSize">
      <ScrollPanel>
        <Preview />
      </ScrollPanel>
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import ScrollPanel from '@/components/ScrollPanel.vue'
import Explorer from '@/components/writer/Panes/Explorer.vue'
import Toolbar from '@/components/writer/Toolbar.vue'
import OfferSampleDoc from '@/components/writer/OfferSampleDoc.vue'
import Editor from '@/components/writer/Panes/Editor.vue'
import Preview from '@/components/writer/Panes/Preview.vue'

import { useUIStore } from '@/stores/UIStore'

// We tried but [PrimeVue Splitter](https://primevue.org/splitter/) is very
// buggy, this is alternative
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const uiStore = useUIStore()
</script>

<style scroped>
/* Customize default Splitpanes theme */
.splitpanes.default-theme .splitpanes__pane {
  /* Reset default theme gray background */
  background: none;
}
</style>
