<template>
  <!-- Alerts -->
  <PreviewState />

  <!-- Preview -->
  <div class="h-full overflow-auto" title="HTML preview of markup">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="sphinx-preview pointer-events-none" v-html="sanitizedHtml" />
  </div>
</template>

<script setup lang="ts">
import { usePreviewStore } from "~/stores/PreviewStore";
import { computed } from "vue";
import DOMPurify from "dompurify";

const previewStore = usePreviewStore();
const uiStore = useUiStore();

const sanitizedHtml = computed(() => {
  // DOMPurify can run on browser only
  if (import.meta.client) {
    return DOMPurify.sanitize(
      previewStore.result?.htmlFiles[uiStore.activeDoc] ?? "",
    );
  } else {
    return null;
  }
});
</script>
