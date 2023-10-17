<template>
  <Button icon="icon--mdi icon--mdi--undo" outlined @click="onUndo" :disabled="isUndoDisabled" />
  <Button icon="icon--mdi icon--mdi--redo" outlined @click="onRedo"
  :disabled="isRedoDisabled"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useUIStore } from "@/stores/UIStore";
import { computed } from 'vue';

const uiStore = useUIStore()

const onUndo = () => {
  uiStore.cmInstance?.getDoc().undo()
}
const onRedo = () => {
  uiStore.cmInstance?.getDoc().redo()
}
const isUndoDisabled = computed(() =>
  // Initial undo history length is 1 (not 0), i.e. do nothing for 1.
  // Reason: setting body from API in DocStore is very first operation
  uiStore.cmHistorySize ? !(uiStore.cmHistorySize.undo > 1) : true
)
const isRedoDisabled = computed(() =>
  uiStore.cmHistorySize ? !(uiStore.cmHistorySize.redo > 0) : true
)
</script>

<style scoped lang="scss"></style>
