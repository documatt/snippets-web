<template>
  <div class="tabs tabs-border h-full">
    <input
      type="radio"
      :name="tabGroup"
      class="tab"
      :aria-label="filename"
      checked
    />
    <div class="tab-content p-3">
      <Editor :filename="filename" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const tabGroup = "editor";
const previewStore = usePreviewStore();
const filename = computed(() => getRootFilename(previewStore.syntax));
</script>
