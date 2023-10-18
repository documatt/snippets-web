import { logger } from '@/utils/logger'
import { type TemplateFn } from '@/utils/editorSyntax'
import { defaultLayout } from '@/utils/ui'
import type { Editor } from 'codemirror'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  // ***************************************************************************
  // Preview
  // ***************************************************************************

  const previewIsVisible = ref()

  // ***************************************************************************
  // Layout
  // ***************************************************************************

  const layout = ref(defaultLayout)

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

  // *** Inserting *************************************************************

  /**
   * Expect a function producing a template string with the `$0`. Template
   * will be replaced with a selection or with a fallback value if
   * nothing is selected at the moment.
   */
  function cmInsertText(templateFn: TemplateFn, fallback: string) {
    const cm = cmInstance.value

    // Nothing if CM instance is not set yet
    if (!cm) return

    // Wrap text around selection, if any. Otherwise, just insert as-is.
    let selection = cm.getDoc().getSelection()
    if (selection) {
      selection = selection.trim()
      const template = templateFn(selection)
      const replacement = template.replace('$0', selection)

      logger.trace(`Inserting to CM '${replacement}' instead of selection '${selection}' made by rendering template '${template}'.`)
      cm.getDoc().replaceSelection(replacement)

    } else {
      const template = templateFn(fallback)
      const replacement = template.replace('$0', fallback)
      const cur = cm.getDoc().getCursor()

      logger.trace(`Inserting to CM '${replacement}' at the current position made by rendering template '${template}'.`)
      cm.getDoc().replaceRange(replacement, cur!)
    }

    // focus again because replace lost it
    cm.focus()
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return {
    layout,
    previewIsVisible,
    cmInstance,
    cmHistorySize,
    clearCmHistory,
    updateCmHistory,
    cmInsertText,
  }
})
