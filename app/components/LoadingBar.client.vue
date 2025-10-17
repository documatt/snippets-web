<template>
  <div
    v-if="hash"
    class="[&>*]:rounded-none [&>*]:border-t-0 [&>*]:border-b [&>*]:border-slate-300! [&>*]:px-8"
  >
    <!-- pending -->
    <div v-if="pending" role="alert" class="alert alert-soft alert-info">
      <span class="loading loading-spinner loading-xs" />Loading snippet...
    </div>

    <!-- error -->
    <div v-else-if="error" role="alert" class="alert alert-soft alert-error">
      <Icon name="prime:exclamation-triangle" />
      There is no such snippet, or an error has occurred!
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const previewStore = usePreviewStore();
const appConfig = useAppConfig();

// undefined, or e.g., "34ce5bc8" from "/s/34ce5bc8"
const hash = route.path.startsWith("/s/") ? route.path.slice(3) : undefined;

const {
  refresh,
  data: files,
  pending,
  error,
} = await useAsyncData(route.path, fetchFiles, {
  server: false,
  immediate: false,
});

if (hash) refresh();

interface SnippetsJson10 {
  version: "1.0";
  inFilenames: string[];
}

async function fetchFiles() {
  // TODO: Use Promise.all() to load all files at once
  const snippetsJson = await $fetch<SnippetsJson10>(
    `${appConfig.bucketPrefix}/${hash}/snippets.json`,
  );
  for (const filename of snippetsJson.inFilenames) {
    previewStore.files[filename] = await $fetch<string>(
      `${appConfig.bucketPrefix}/${hash}/in/${filename}`,
    );
  }
}

watch(files, (newFiles) => {
  if (!newFiles) return;
  previewStore.files = newFiles;
});
</script>
