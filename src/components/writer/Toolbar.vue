<template>
  <Toolbar
    :pt="{
      root: {
        class: 'py-1 pl-0 pr-2',
        style: 'background: none; border: none;'
      }
    }"
  >
    <template #start>
      <div data-testid="formatting-buttons" v-if="previewStore.isPreviewable">
        <span class="p-buttonset mr-3">
          <Button icon="icon--mdi icon--mdi--format-header-1" outlined />
          <Button icon="icon--mdi icon--mdi--format-bold" outlined />
          <Button icon="icon--mdi icon--mdi--format-italic" outlined />
        </span>
        <span class="p-buttonset mr-3">
          <Button icon="icon--mdi icon--mdi--link" outlined />
          <Button icon="icon--mdi icon--mdi--image-outline" outlined />
          <Button icon="icon--mdi icon--mdi--code-tags" outlined />
          <Button icon="icon--mdi icon--mdi--format-list-bulleted" outlined />
          <Button icon="icon--mdi icon--mdi--format-list-numbered" outlined />
        </span>
      </div>

      <span class="p-buttonset mr-3">
        <Button icon="icon--mdi icon--mdi--undo" outlined />
        <Button icon="icon--mdi icon--mdi--redo" outlined />
      </span>

      <div data-testid="help-button" v-if="previewStore.isPreviewable">
        <HelpButton />
      </div>
    </template>
    <template #end>
      <div data-testid="change-layout-button" v-if="previewStore.isPreviewable">
        <ChangeLayoutButton />
      </div>
      <SaveStatusIcon />
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { usePreviewStore } from '@/stores/PreviewStore'
import SaveStatusIcon from './Toolbar/SaveStatusIcon.vue'
import ChangeLayoutButton from './Toolbar/ChangeLayoutButton.vue'
import HelpButton from './Toolbar/HelpButton.vue'

const previewStore = usePreviewStore()
</script>

<style scoped>
:deep(.p-button.p-button-outlined) {
  color: var(--surface-600);
  border-color: var(--surface-300);
}
:deep(.p-button-icon) {
  font-size: 1.5rem;
}
:deep(.p-button.p-button-icon-only) {
  width: auto;
}
:deep(.p-button) {
  padding: 0.5rem;
}
</style>
