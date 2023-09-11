<!-- UI around preview pane itself -->

<template>
  <ScrollPanel>
    <WriterPreviewPane />
  </ScrollPanel>
</template>

<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import ScrollPanel from "primevue/scrollpanel";

import { useUIStore } from "~/stores/UIStore";

const uiStore = useUIStore();
</script>