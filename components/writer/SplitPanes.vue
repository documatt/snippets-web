<script setup lang="ts">
import { useUIStore } from "~/stores/UIStore";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'


const uiStore = useUIStore();
</script>

<template>
    <Splitpanes class="default-theme h-screen">
      <Pane :size="30"  v-if="uiStore.layout.showExplorer">
        <WriterExplorer/>
      </Pane>
      <Pane :size="60">
        <WriterEditor/>
      </Pane>
      <Pane :size="30" v-if="uiStore.layout.showPreview">
        <WriterPreviewUI/>
      </Pane>
    </Splitpanes>
</template>

<style scroped>
</style>