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
    ref="textarea"
    v-model="previewStore.files[props.filename]"
    class="textarea min-h-full w-full font-mono text-slate-700 focus:outline-0 dark:text-slate-300"
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

// *** Warn dialog before reload ******************************************************

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const textarea = useTemplateRef("textarea");

function handleBeforeUnload(e: BeforeUnloadEvent) {
  if (textarea && textarea.value!.value.trim() !== "") {
    // this will show generic browser dialog, it cannot be customized
    e.preventDefault();
  }
}
</script>
