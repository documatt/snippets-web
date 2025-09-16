<template>
  <div class="tooltip tooltip-left" data-tip="Switch syntax">
    <select v-model="previewStore.syntax" class="select select-ghost">
      <option :value="Syntax.RST" selected>reStructuredText</option>
      <option :value="Syntax.MD">Markdown</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const previewStore = usePreviewStore();
</script>
