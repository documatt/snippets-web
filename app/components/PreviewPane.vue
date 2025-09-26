<template>
  <div class="tabs tabs-border h-full">
    <input
      type="radio"
      :name="tabGroup"
      class="tab"
      aria-label="Preview"
      checked
    />
    <div class="tab-content p-3">
      <PreviewRenderTab />
    </div>

    <input type="radio" :name="tabGroup" class="tab" aria-label="HTML" />
    <div class="tab-content p-3">
      <PreviewHtmlTab />
    </div>

    <input type="radio" :name="tabGroup" class="tab" aria-label="Status" />
    <div class="tab-content p-3">
      <PreviewShowSource :source="previewStore.result?.status" />
    </div>

    <input type="radio" :name="tabGroup" class="tab" aria-label="Warnings" />
    <div class="tab-content p-3">
      <PreviewShowSource :source="previewStore.result?.warnings" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const tabGroup = "preview";
const previewStore = usePreviewStore();
</script>
