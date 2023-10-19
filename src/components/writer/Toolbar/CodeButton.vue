<template>
  <SplitButton icon="icon--mdi icon--mdi--code-tags" outlined :model="items" @click="plainBlock" v-tooltip.bottom="'Insert source code example'"/>
</template>

<script setup lang="ts">
import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';
import type { MenuItem } from 'primevue/menuitem';
import SplitButton from 'primevue/splitbutton';

const uiStore = useUIStore()
const docStore = useDocStore()

function plainBlock() {
  if (docStore.editorSyntax) {
    uiStore.cmInsertText(docStore.editorSyntax.codes.plainBlock,
`def add(one, two):
      return one + two`)
  }
}

function highlightedBlock() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.codes.highlightedBlock,
`for (let i = 0; i < 3; i++) {        // shows 0, then 1, then 2
      alert(i);
   }`)
}

function plainInline() {
  if (docStore.editorSyntax)
    uiStore.cmInsertText(docStore.editorSyntax.codes.plainInline, "example code")
}

const items: MenuItem[] = [
  {
    label: 'Plain code block',
    command: plainBlock
  },
  {
    label: 'Code block with syntax highlighting',
    command: highlightedBlock
  },
  {
    label: 'Plain inline code',
    command: plainInline
  },
]
</script>

<style scoped lang="scss"></style>
