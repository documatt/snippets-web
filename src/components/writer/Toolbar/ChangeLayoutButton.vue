<template>
  <SplitButton
    :label="layoutBtnLabel"
    v-tooltip.bottom="'Change view layout'"
    :icon="layoutBtnIcon"
    :model="layoutBtnItems"
    @click="toggleLayout"
    class="mr-1"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import SplitButton from 'primevue/splitbutton'
import { explorerLayout, previewLayout, type Layout, allLayouts } from '@/utils/ui'
import { useUIStore } from '@/stores/UIStore'

const uiStore = useUIStore()
const layoutBtnLabel = ref(previewLayout.label)
const layoutBtnIcon = ref(previewLayout.icon)

/** Toggle between preview and explorer layouts. */
function toggleLayout() {
  if (JSON.stringify(uiStore.layout) == JSON.stringify(explorerLayout)) {
    switchLayout(previewLayout)
    layoutBtnLabel.value = explorerLayout.label
    layoutBtnIcon.value = explorerLayout.icon
  } else {
    switchLayout(explorerLayout)
    layoutBtnLabel.value = previewLayout.label
    layoutBtnIcon.value = previewLayout.icon
  }
}

/** Perform actual layout switching */
function switchLayout(layout: Layout) {
  // Layout button
  layoutBtnLabel.value = layout.label
  layoutBtnIcon.value = layout.icon

  // UI state
  uiStore.layout = layout
}

const layoutBtnItems = allLayouts.map((layout) => {
  return {
    label: layout.label,
    icon: layout.icon,
    command: () => switchLayout(layout)
  }
})
</script>

<style scoped>
:deep(.p-splitbutton .p-button-icon-left) {
  font-size: 1rem;
}
:deep(.p-splitbutton-defaultbutton) {
  padding-left: 0.75rem !important;
}
:deep(.p-splitbutton-menubutton) {
    padding: 0 0.75rem !important;
}
</style>