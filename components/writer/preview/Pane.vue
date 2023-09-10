<!-- Preview HTML itself -->

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
import { usePreviewStore } from "@/stores/PreviewStore";
import { computed } from "vue";

const docStore = useDocStore();
const previewStore = usePreviewStore();

const isPreviewBodyEmpty = computed(() => !previewStore.body);
const toBlurry = computed(
  () =>
    docStore.isDirty ||
    docStore.isSaving ||
    previewStore.isInProgress ||
    previewStore.isInError
);
</script>

<template>
  <div>
    <template v-if="!isPreviewBodyEmpty">
      <div v-html="previewStore.body" :class="{ blurry: toBlurry }"></div>
    </template>
    <div v-else-if="previewStore.isInError">
      <!-- TODO: Vycentrovat vertikálně i horizontálně -->
      TODO: Je nám líto, ale náhled se nepovedl
      <button @click.prevent="previewStore.refreshPreview">
        Refresh preview
      </button>
    </div>
    <div v-else>
      <!-- TODO: Vycentrovat vertikálně i horizontálně -->
      <i class="pi pi-spin pi-cog" style="font-size: 4rem"></i>
    </div>
  </div>
</template>

<style scoped>
.blurry {
  filter: blur(3px);
}
</style>
