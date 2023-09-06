<script setup lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore";
import Sidebar from "primevue/sidebar";
import { computed, reactive, ref } from "vue";
import PreviewPane from "./PreviewPane.vue";

const globalStore = useGlobalStore();

const defaultSize = "w-9 xl:w-6";
const sizes = reactive([
  // narrower than default
  "w-4 xl:w-2",
  "w-6 xl:w-4",
  defaultSize,
  // wider than default
  "w-10 xl:w-8",
  "w-12 xl:w-10",
  "w-12 xl:w-12"
]);

const preferredSize = ref(defaultSize);

function changeSize(step: -1 | 1) {
  const currentSizeIndex = sizes.indexOf(preferredSize.value);
  preferredSize.value = sizes[currentSizeIndex + step];
}

// +1 because `length` one higher than the highest index in the array
const cannotWider = computed(
  () => sizes.indexOf(preferredSize.value) + 1 == sizes.length
);
const cannotNarrow = computed(() => sizes.indexOf(preferredSize.value) == 0);
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
          v-tooltip.bottom="'Widen preview sidebar'"
          @click="changeSize(1)"
          :disabled="cannotWider"
        >
          <span class="pi pi-angle-double-left" />
        </button>
        <button
          class="p-sidebar-icon p-link mr-2"
          v-tooltip.bottom="'Narrow preview sidebar'"
          @click="changeSize(-1)"
          :disabled="cannotNarrow"
        >
          <span class="pi pi-angle-double-right" />
        </button>
        <!-- Wider/narrower pane size buttons END -->
      </div>
    </template>

    <PreviewPane />
  </Sidebar>
</template>
