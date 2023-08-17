<script setup lang="ts">
import Editor from "./Editor.vue";
import EditorToolbar from "./EditorToolbar.vue";
import OfferSampleDoc from "./OfferSampleDoc.vue";
import PreviewSidebar from "./PreviewSidebar.vue";
</script>

<template>
  <div class="grid">
    <div class="col-12 xl:col-8 xl:col-offset-2">
      <EditorToolbar />
      <OfferSampleDoc />
      <Editor />
      <PreviewSidebar />
    </div>
  </div>
</template>
