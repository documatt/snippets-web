<!-- Offer sample doc when doc is blank -->
<template>
  <!-- If it's blank -->
  <div v-if="isBlank" role="alert" class="alert alert-outline alert-info mb-4">
    <span
      >Do you want to start with a
      <a class="link link-info" @click.prevent="loadSample">sample document</a
      >?</span
    >
  </div>
</template>

<script setup lang="ts">
// Read files to a string variable
// https://vitejs.dev/guide/assets.html#importing-asset-as-string
import sampleRst from "~/assets/templates/sample.rst?raw";
import sampleMd from "~/assets/templates/sample.md?raw";

const props = defineProps<{ filename: string }>();
const previewStore = usePreviewStore();
const uiStore = useUiStore();

const isBlank = computed(() => !previewStore.files[props.filename]?.trim());

function loadSample() {
  let body = previewStore.syntax == Syntax.RST ? sampleRst : sampleMd;
  body = replacePlaceholders(body, uiStore.activeDoc);
  previewStore.files[props.filename] = body;
}

const PLACEHOLDER_FILENAME = "{FILENAME}";

function replacePlaceholders(template: string, filename: string) {
  return template.replace(PLACEHOLDER_FILENAME, filename);
}
</script>
