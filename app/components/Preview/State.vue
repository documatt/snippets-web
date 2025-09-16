<template>
  <div
    v-if="previewStore.state == PreviewStates.Booting"
    role="alert"
    class="alert alert-outline alert-info mb-4 text-secondary"
  >
    <span class="loading loading-spinner loading-xs"></span>
    <span>Sphinx in your browser is starting. Please wait.</span>
  </div>
</template>

<script lang="ts" setup>
const previewStore = usePreviewStore();
</script>
