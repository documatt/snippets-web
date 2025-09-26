<!-- Text editor -->

<template>
  <textarea
    ref="textarea"
    v-model="previewStore.files[props.filename]"
    class="textarea min-h-full w-full font-mono text-slate-700 focus:outline-0 dark:text-slate-300"
    placeholder="Every journey begins with a first step"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ filename: string }>();
const previewStore = usePreviewStore();

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
