<template>
  <PreviewShowSource
    :source="previewStore.result?.htmlFiles[uiStore.activeDoc]"
  />
</template>

<script setup lang="ts">
const previewStore = usePreviewStore();
const uiStore = useUiStore();
</script>
