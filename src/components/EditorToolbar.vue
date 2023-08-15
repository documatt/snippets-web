<script setup lang="ts">
import { computed } from "vue";

import { useDocStore } from "@/stores/DocStore";
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";

let docStore = useDocStore()

const isDirtyAndNotSaved = computed(()=>{
  return docStore.isDirty && !docStore.isSaving
})

const isDirtyButSaving = computed(()=>{
  return docStore.isDirty && docStore.isSaving
})

const isNotDirtyAndSaved = computed(()=>{
  return !docStore.isDirty && !docStore.isSaving
})

const saveStatusIcons = computed(() => {
  // adding "pi-spin" will animate an icon
  if (isDirtyAndNotSaved.value)
    return ["pi-spinner"]
  else if (isDirtyButSaving.value)
    return ["pi-spinner", "pi-spin"]
  else if (isNotDirtyAndSaved.value)
    return ["pi-check-circle"]

  throw Error("Unexpected document state")
});

const saveStatusTooltip = computed(() => {
  if (isDirtyAndNotSaved.value)
    return "Pending changes"
  else if (isDirtyButSaving.value)
    return "Saving changes"
  else if (isNotDirtyAndSaved.value)
    return "All changes saved automatically"

  throw Error("Unexpected document state")
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
      docStore.body = ""
    }
  });
};

async function onSaveBody() {
  await docStore.save()
}

</script>

<template>
  <div>
    <div class="flex align-items-center justify-content-center">
      <span class="p-buttonset">
        <Button label="Save" icon="pi pi-check" outlined @click="onSaveBody"/>
        <Button label="More buttons" icon="pi pi-trash" outlined disabled/>
        <Button label="are just for" icon="pi pi-trash" outlined disabled/>
        <Button label="demonstration" icon="pi pi-times" outlined disabled/>
      </span>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <Button label="New" @click="onNewDocumentClick($event)"></Button>

      <i
        class="pi ml-3"
        :class="saveStatusIcons"
        v-tooltip.left="saveStatusTooltip"
      ></i>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-menubar) {
  background: none;
}
</style>
