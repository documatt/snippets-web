<script setup lang="ts">
import { computed } from "vue";

import { useDocStore } from "@/stores/DocStore";
import SplitButton from "primevue/splitbutton";
import Toolbar from "primevue/toolbar";
import { useConfirm } from "primevue/useconfirm";
import { useUIStore } from "~/stores/UIStore";
import { explorerEditorPreviewLayout } from "~/utils/ui";

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

async function onSaveBody() {
  await docStore.save();
}

// *** Layout ******************************************************************

const layoutBtnLabel = ref(defaultLayout.label);
const layoutBtnIcon = ref(defaultLayout.icon);

/** Toggle between editorPreview and explorerEditor layouts. */
function toggleLayout() {
  if (JSON.stringify(uiStore.layout) == JSON.stringify(explorerEditorLayout)) {
    switchLayout(editorPreviewLayout);
  } else {
    switchLayout(explorerEditorLayout);
  }
};

/** Perform actual layout switching */
function switchLayout(layout: typeof explorerEditorLayout) {
  // Layout button
  layoutBtnLabel.value = layout.label;
  layoutBtnIcon.value = layout.icon;

  // UI state
  uiStore.layout = layout;
};

// const layoutBtnItems2 = ...

const layoutBtnItems = [
  {
    label: explorerEditorLayout.label,
    icon: explorerEditorLayout.icon,
    command: () => switchLayout(explorerEditorLayout),
  },
  {
    label: editorPreviewLayout.label,
    icon: editorPreviewLayout.icon,
    command: () => switchLayout(editorPreviewLayout),
  },
  {
    label: explorerEditorPreviewLayout.label,
    icon: explorerEditorPreviewLayout.icon,
    command: () => switchLayout(explorerEditorPreviewLayout),
  },
  {
    label: editorOnlyLayout.label,
    icon: editorOnlyLayout.icon,
    command: () => switchLayout(editorOnlyLayout),
  },
];
</script>

<template>
  <Toolbar>
    <template #start>
      <Button label="Save" icon="pi pi-check" outlined @click="onSaveBody" />
      <Button label="More buttons" icon="pi pi-trash" outlined disabled />
      <Button label="are just for" icon="pi pi-trash" outlined disabled />
    </template>
    <template #end>
      <i
        class="pi mr-2"
        :class="saveStatusIcons"
        v-tooltip.bottom="saveStatusTooltip"
      ></i>

      <Button
        label="New"
        @click="onNewDocumentClick($event)"
        class="mr-2"
        outlined
      ></Button>

      <SplitButton
        :label="layoutBtnLabel"
        :icon="layoutBtnIcon"
        :model="layoutBtnItems"
        @click="toggleLayout"
        v-tooltip.bottom="'Change view layout'"
      />
    </template>
  </Toolbar>
</template>

<style scoped>
:deep(.p-menubar) {
  background: none;
}
</style>
