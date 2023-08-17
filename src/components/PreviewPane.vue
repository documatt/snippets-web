<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
import { useGlobalStore } from "@/stores/GlobalStore";
import { usePreviewStore } from "@/stores/PreviewStore";
import { computed } from "vue";
import Sidebar from "primevue/sidebar";

const globalStore = useGlobalStore();
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
  <Sidebar
    v-model:visible="globalStore.isPreviewPaneVisible"
    position="right"
    class="w-9 xl:w-6"
  >
    <template #header>
      <div class="flex">
        <button
          class="p-sidebar-icon p-link mr-2"
          v-tooltip.bottom="'Widen preview pane'"
        >
          <span class="pi pi-angle-double-left" />
        </button>
        <button
          class="p-sidebar-icon p-link mr-2"
          v-tooltip.bottom="'Narrow preview pane'"
        >
          <span class="pi pi-angle-double-right" />
        </button>
      </div>
    </template>
    <div>
      <button @click.prevent="previewStore.refreshPreview">
        Refresh preview (to be removed in prod - has no meaning)
      </button>

      <template v-if="!isPreviewBodyEmpty">
        <div v-html="previewStore.body" :class="{ blurry: toBlurry }"></div>
      </template>
      <div v-else-if="previewStore.isInError">
        TODO: Je nám líto, ale náhled se nepovedl
        <button @click.prevent="previewStore.refreshPreview">
          Refresh preview
        </button>
      </div>
      <div v-else>
        <i class="pi pi-spin pi-cog" style="font-size: 4rem"></i>
      </div>
    </div>
  </Sidebar>
</template>

<style scoped>
.blurry {
  filter: blur(3px);
}
</style>
