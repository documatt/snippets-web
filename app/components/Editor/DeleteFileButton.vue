<template>
  <div
    v-if="canBeDeleted()"
    class="tooltip tooltip-right"
    data-tip="Delete file"
    @click="deleteFile"
  >
    <Icon name="prime:times" class="block! text-red-500" />
  </div>
</template>

<script setup lang="ts">
const previewStore = usePreviewStore();
const props = defineProps<{ filename: string }>();

function canBeDeleted() {
  const rootFilename = getRootFilename(previewStore.syntax);
  if (props.filename === rootFilename) return false;
  return true;
}

function deleteFile() {
  const yes = window.confirm(
    `Do you really want to delete "${props.filename}"?`,
  );
  if (yes) {
    // delete command breaks reactivity, the recommended approach is to clone new object to notice Vue
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete previewStore.files[props.filename];
    previewStore.files = { ...previewStore.files };
  }
}
</script>
