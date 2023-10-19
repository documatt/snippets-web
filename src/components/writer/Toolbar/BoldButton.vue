<template>
  <Button icon="icon--mdi icon--mdi--format-bold" outlined @click="bold"
  :pt="{
    // Fix rounder corners within a button set
    root: { style: { 'border-radius': 0 } }
  }"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';

const uiStore = useUIStore()
const docStore = useDocStore()

function bold() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.bold.bold, "two asterisk to **bold** text")
}
</script>