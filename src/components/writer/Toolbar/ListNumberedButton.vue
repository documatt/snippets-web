<template>
  <Button icon="icon--mdi icon--mdi--format-list-numbered" outlined v-tooltip.bottom="'Insert numbered list example'" @click="numberedList"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';

const uiStore = useUIStore()
const docStore = useDocStore()

function numberedList() {
  if (docStore.editorSyntax) {
    uiStore.cmInsertText(docStore.editorSyntax.lists.numbered, "")
  }
}

</script>

<style scoped lang="scss"></style>
