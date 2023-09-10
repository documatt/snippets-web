<script setup lang="ts">
import { useUIStore } from "~/stores/UIStore";

const uiStore = useUIStore();
</script>

<template>
  <div>

    <WriterToolbar />

    <div class="grid">
      <div class="col-3" v-if="!uiStore.previewVisible">
        <WriterExplorer/>
      </div>
      <div :class="uiStore.widths.writer">
        <WriterEditor/>
      </div>
      <div :class="uiStore.widths.preview" v-if="uiStore.previewVisible">
        <WriterPreviewUI/>
      </div>
    </div>
  </div>
</template>

<style scroped>
.preview-pane {
  background-color: bisque;
}
</style>
