<template>
  <div>
    <div class="flex align-items-center justify-content-center">
      <span class="p-buttonset">
        <Button label="Save" icon="pi pi-check" outlined />
        <Button label="Delete" icon="pi pi-trash" outlined/>
        <Button label="Cancel" icon="pi pi-times" outlined/>
      </span>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <Button label="New" @click="onNewDocumentClick($event)"></Button>

      <i
        class="pi ml-3"
        :class="saveStatusIcons"
        v-tooltip.left="'All changes automatically saved'"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";

// Save status icon
let isSaving = ref(true);

const saveStatusIcons = computed(() =>
  isSaving.value ? ["pi-spinner", "pi-spin"] : ["pi-check-circle"]
);

// New document button
const confirm = useConfirm();
const onNewDocumentClick = (event) => {
  confirm.require({
    target: event.currentTarget,
    header: "New document",
    message: "Discard existing document and start with the new one?",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      console.log("accept");
    },
    reject: () => {
      console.log("reject");
    }
  });
};
</script>

<style scoped>
:deep(.p-menubar) {
  background: none;
}
</style>
