<template>
  <SplitButton icon="icon--mdi icon--mdi--format-header-1" outlined :model="items" @click="h1"/>
</template>

<script setup lang="ts">
import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';
import type { MenuItem } from 'primevue/menuitem';
import SplitButton from 'primevue/splitbutton';

const uiStore = useUIStore()
const docStore = useDocStore()

function h1() {
  if (docStore.editorSyntax) {
    uiStore.cmInsertText(docStore.editorSyntax.headings.h1, "Section 1")
  }
}

function h2() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.headings.h2, "Section 2")
}

function h3() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.headings.h3, "Section 3")
}

function h4() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.headings.h4, "Section 4")
}

function h5() {
   if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.headings.h5, "Section 5")
}

function h6() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.headings.h6, "Section 6")
}

const items: MenuItem[] = [
  {
    label: 'H1',
    command: h1
  },
  {
    label: 'H2',
    command: h2
  },
  {
    label: 'H3',
    command: h3
  },
  {
    label: 'H4',
    command: h4
  },
  {
    label: 'H5',
    command: h5
  },
  {
    label: 'H6',
    command: h6
  }
]
</script>

<style scoped lang="scss"></style>
