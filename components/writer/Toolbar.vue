<template>
  <Toolbar class="bottom-shadow">
    <template #start>
      <Button label="Something" icon="pi pi-check" outlined />
      <Button label="More buttons" icon="pi pi-trash" outlined disabled />
      <Button label="are just for" icon="pi pi-trash" outlined disabled />
    </template>
    <template #end>
      <Button
        label="New"
        @click="onNewDocumentClick($event)"
        class="mr-2"
        outlined
      ></Button>

      <SplitButton
        :label="layoutBtnLabel"
        v-tooltip.bottom="'Change view layout'"
        :icon="layoutBtnIcon"
        :model="layoutBtnItems"
        @click="toggleLayout"
        class="mr-2"
      />

      <i
        class="pi"
        :class="saveStatusIcons"
        v-tooltip.bottom="saveStatusTooltip"
      ></i>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useDocStore } from "@/stores/DocStore";
import SplitButton from "primevue/splitbutton";
import Toolbar from "primevue/toolbar";
import { useConfirm } from "primevue/useconfirm";
import { useUIStore } from "~/stores/UIStore";

const uiStore = useUIStore();
const docStore = useDocStore();

const isDirtyAndNotSaved = computed(() => {
  return docStore.isDirty && !docStore.isSaving;
});

const isDirtyButSaving = computed(() => {
  return docStore.isDirty && docStore.isSaving;
});

const isNotDirtyAndSaved = computed(() => {
  return !docStore.isDirty && !docStore.isSaving;
});

const saveStatusIcons = computed(() => {
  // adding "pi-spin" will animate an icon
  if (isDirtyAndNotSaved.value) return ["pi-spinner"];
  else if (isDirtyButSaving.value) return ["pi-spinner", "pi-spin"];
  else if (isNotDirtyAndSaved.value) return ["pi-check-circle"];

  throw Error("Unexpected document state");
});

const saveStatusTooltip = computed(() => {
  if (isDirtyAndNotSaved.value) return "Pending changes";
  else if (isDirtyButSaving.value) return "Saving changes";
  else if (isNotDirtyAndSaved.value) return "All changes saved automatically";

  throw Error("Unexpected document state");
});

// New document button
const confirm = useConfirm();
function onNewDocumentClick(event) {
  confirm.require({
    target: event.currentTarget,
    header: "New document",
    message: "Discard existing document and start with the new one?",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      docStore.body = "";
    },
  });
}

// *** Layout ******************************************************************

const layoutBtnLabel = ref(previewLayout.label);
const layoutBtnIcon = ref(previewLayout.icon);

/** Toggle between preview and explorer layouts. */
function toggleLayout() {
  if (JSON.stringify(uiStore.layout) == JSON.stringify(explorerLayout)) {
    switchLayout(previewLayout);
    layoutBtnLabel.value = explorerLayout.label;
    layoutBtnIcon.value = explorerLayout.icon;
  } else {
    switchLayout(explorerLayout);
    layoutBtnLabel.value = previewLayout.label;
    layoutBtnIcon.value = previewLayout.icon;
  }
}

/** Perform actual layout switching */
function switchLayout(layout: Layout) {
  // Layout button
  layoutBtnLabel.value = layout.label;
  layoutBtnIcon.value = layout.icon;

  // UI state
  uiStore.layout = layout;
}

const layoutBtnItems = allLayouts.map((layout) => {
  return {
    label: layout.label,
    icon: layout.icon,
    command: () => switchLayout(layout),
  };
});
</script>

<style scoped>
:deep(.p-menubar) {
  background: none;
}
</style>
