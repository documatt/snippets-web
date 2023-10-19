<template>
  <Button icon="icon--mdi icon--mdi--image-outline" outlined @click="blockImage" v-tooltip.bottom="'Insert block image example'"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';

const uiStore = useUIStore()
const docStore = useDocStore()

function blockImage() {
  if (docStore.editorSyntax) {
    uiStore.cmInsertText(docStore.editorSyntax.images.blockImage, "")
  }
}
</script>

<style scoped lang="scss"></style>
