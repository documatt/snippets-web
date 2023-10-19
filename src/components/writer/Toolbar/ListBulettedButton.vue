<template>
  <Button icon="icon--mdi icon--mdi--format-list-bulleted" outlined v-tooltip.bottom="'Insert bulleted list example'" @click="bulletedList"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';

const uiStore = useUIStore()
const docStore = useDocStore()

function bulletedList() {
  if (docStore.editorSyntax) {
    uiStore.cmInsertText(docStore.editorSyntax.lists.bulleted, "")
  }
}

</script>

<style scoped lang="scss"></style>
