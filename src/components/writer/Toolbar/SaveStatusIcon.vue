<template>
  <i class="pi" :class="saveStatusIcons" v-tooltip.bottom="saveStatusTooltip"></i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDocStore } from '@/stores/DocStore'

const docStore = useDocStore()

const isDirtyAndNotSaved = computed(() => {
  return docStore.isDirty && !docStore.isSaving
})

const isDirtyButSaving = computed(() => {
  return docStore.isDirty && docStore.isSaving
})

const isNotDirtyAndSaved = computed(() => {
  return !docStore.isDirty && !docStore.isSaving
})

const saveStatusIcons = computed(() => {
  // adding "pi-spin" will animate an icon
  if (isDirtyAndNotSaved.value) return ['pi-spinner']
  else if (isDirtyButSaving.value) return ['pi-spinner', 'pi-spin']
  else if (isNotDirtyAndSaved.value) return ['pi-check-circle']

  throw Error('Unexpected document state')
})

const saveStatusTooltip = computed(() => {
  if (isDirtyAndNotSaved.value) return 'Pending changes'
  else if (isDirtyButSaving.value) return 'Saving changes'
  else if (isNotDirtyAndSaved.value) return 'All changes saved automatically'

  throw Error('Unexpected document state')
})
</script>

<style scoped lang="scss"></style>
