import { defaultLayout } from '@/utils/ui'
import type { Editor } from 'codemirror'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  // ***************************************************************************
  // State
  // ***************************************************************************

  const previewIsVisible = ref()

  // ***************************************************************************
  // CodeMirror
  // ***************************************************************************

  // CodeMirror instance, set from Editor component after CM is ready
  const cmInstance = ref<Editor>()

  // *** History tracking ******************************************************

  // Tracks "size" of undo/redo history. Set from onChanges event handler.
  // Return type if of doc.historySize() → {undo: integer, redo: integer}
  // https://codemirror.net/5/doc/manual.html#api_history
  const cmHistorySize = ref<{ undo: number; redo: number }>()

  // Clear CM history to prevent undoing/redoing changes from previous doc
  function clearCmHistory() {
    cmInstance.value?.getDoc().clearHistory()
  }

  // On every change, update history size object
  // used to enabling/disabling Undo/Redo buttons
  // https://codemirror.net/5/doc/manual.html#api_history
  function updateCmHistory() {
    cmHistorySize.value = cmInstance.value?.getDoc().historySize()
  }

  // *** Layout ****************************************************************

  const layout = ref(defaultLayout)

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return {
    layout,
    previewIsVisible,
    cmInstance,
    cmHistorySize,
    clearCmHistory,
    updateCmHistory
  }
})
