<template>
  <div
    v-if="previewStore.rootDocIsBlank"
    role="alert"
    class="alert alert-outline alert-info mb-4"
  >
    <span
      >Do you want to start with a
      <a class="link link-info" @click.prevent="loadSample">sample document</a
      >?</span
    >
  </div>

  <textarea
    v-model="previewStore.files[props.filename]"
    class="textarea w-full min-h-full font-mono focus:outline-0 text-slate-700 dark:text-slate-300"
    placeholder="Every journey begins with a first step"
  />
</template>

<script setup lang="ts">
// Read files to a string variable
// https://vitejs.dev/guide/assets.html#importing-asset-as-string
import sampleRst from "~/assets/templates/sample.rst?raw";
import sampleMd from "~/assets/templates/sample.md?raw";

const props = defineProps<{ filename: string }>();
const previewStore = usePreviewStore();

function loadSample() {
  previewStore.files[props.filename] =
    previewStore.syntax == Syntax.RST ? sampleRst : sampleMd;
}
</script>
