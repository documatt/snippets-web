<script setup lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore";
import Sidebar from "primevue/sidebar";
import { computed, ref } from "vue";
import PreviewPane from "./PreviewPane.vue";

const globalStore = useGlobalStore();

const defaultSize = "w-9 xl:w-6";
const sizesList = [
  // narrower than default
  "w-6 xl:w-4",
  "w-4 xl:w-2",
  defaultSize,
  // wider than default
  "w-12 xl:w-10",
  "w-10 xl:w-8"
];

// Store and automatically update width in SessionStorage
// const id = useStorage<DocId>("snippets.doc.id", null);
const preferredSize = ref(defaultSize);

function changeSize(step: number) {
  preferredSize.value = sizesList[sizesList.indexOf(defaultSize) + step];
}

const isWidenBtnDisabled = computed(
  () =>
    // +1 because `length` one higher than the highest index in the array
    sizesList.indexOf(defaultSize) + 1 == sizesList.length
);
const isNarrowBtnDisabled = computed(
  () => sizesList.indexOf(defaultSize)  == 0
);
</script>

<template>
  <Sidebar
    v-model:visible="globalStore.isPreviewPaneVisible"
    position="right"
    :class="preferredSize"
  >
    <template #header>
      <div class="flex">
        <!-- Wider/narrower pane size buttons -->
        <button
          class="p-sidebar-icon p-link mr-2"
          v-tooltip.bottom="'Widen preview pane'"
          @click="changeSize(1)"
          :disabled="isWidenBtnDisabled"
        >
          <span class="pi pi-angle-double-left" />
        </button>
        <button
          class="p-sidebar-icon p-link mr-2"
          v-tooltip.bottom="'Narrow preview pane'"
          @click="changeSize(-1)"
          :disabled="isNarrowBtnDisabled"
        >
          <span class="pi pi-angle-double-right" />
        </button>
        <!-- Wider/narrower pane size buttons END -->
      </div>
    </template>

    <PreviewPane />
  </Sidebar>
</template>