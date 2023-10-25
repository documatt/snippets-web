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
          <HeadingButton />
          <BoldButton />
          <ItalicButton />
        </span>
        <span class="p-buttonset mr-3">
          <LinkButton />
          <ImageButton />
          <CodeButton />
          <ListBulettedButton />
          <ListNumberedButton />
        </span>
      </div>

      <span class="p-buttonset mr-3">
        <UndoRedoButtons />
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
import { usePreviewStore } from '@/stores/PreviewStore'

import HeadingButton from './Toolbar/HeadingButton.vue'
import BoldButton from './Toolbar/BoldButton.vue'
import ItalicButton from './Toolbar/ItalicButton.vue'
import LinkButton from './Toolbar/LinkButton.vue'
import ImageButton from './Toolbar/ImageButton.vue'
import CodeButton from './Toolbar/CodeButton.vue'
import ListBulettedButton from './Toolbar/ListBulettedButton.vue'
import ListNumberedButton from './Toolbar/ListNumberedButton.vue'
import UndoRedoButtons from './Toolbar/UndoRedoButtons.vue'
import HelpButton from './Toolbar/HelpButton.vue'
import ChangeLayoutButton from './Toolbar/ChangeLayoutButton.vue'
import SaveStatusIcon from './Toolbar/SaveStatusIcon.vue'

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
