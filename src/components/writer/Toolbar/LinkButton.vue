<template>
  <Button icon="icon--mdi icon--mdi--link" outlined @click="externalLink" v-tooltip.bottom="'Insert external link example'"/>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useDocStore } from '@/stores/DocStore';
import { useUIStore } from '@/stores/UIStore';

const uiStore = useUIStore()
const docStore = useDocStore()

function externalLink() {
  if (docStore.editorSyntax) {
    uiStore.cmInsertText(docStore.editorSyntax.links.externalLink, "Section 1")
  }
}
</script>

<style scoped lang="scss"></style>
