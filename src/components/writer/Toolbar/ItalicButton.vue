<template>
  <Button icon="icon--mdi icon--mdi--format-italic" outlined @click="italic"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';

const uiStore = useUIStore()
const docStore = useDocStore()

function italic() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.italic.italic, "one asterisk to *italic* text")
}
</script>

<style scoped lang="scss"></style>
