<!-- UI around preview pane itself -->

<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import ScrollPanel from "primevue/scrollpanel";

import { useUIStore } from "~/stores/UIStore";

const uiStore = useUIStore();
</script>

<template>
  <ScrollPanel>
    <WriterPreviewPane />
  </ScrollPanel>
</template>
