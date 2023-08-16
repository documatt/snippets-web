<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
import { computed } from "vue";

const docStore = useDocStore();

const isPreviewBodyEmpty = computed(() => !docStore.previewBody);
const toBlurry = computed(
  () => docStore.isDirty || docStore.isSaving || docStore.isPreviewInProgress
);
</script>

<template>
  <div>
    <button @click.prevent="docStore.refreshPreview">Refresh preview</button>

    <template v-if="!isPreviewBodyEmpty">
      <div v-html="docStore.previewBody" :class="{ blurry: toBlurry }"></div>
    </template>
    <div v-else>
      <i class="pi pi-spin pi-cog" style="font-size: 4rem"></i>
    </div>
  </div>
</template>

<style scoped>
/* no background of blocking overlay instead of default grey */
:deep(.p-blockui) {
  background-color: transparent !important;
}

.blurry {
  filter: blur(3px);
}
</style>
