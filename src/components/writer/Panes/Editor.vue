<!--
CodeMirror 5 on-page editor based on [codemirror-editor-vue3](https://www.npmjs.com/package/codemirror-editor-vue3) package.

## Potíže se scrollbary

CM 5 nelze zabalit do PrimeVue ScrollPanelu. CM nedává správnou výšku a ScrollPanel scrollbary se nikdy neaktivují.

To se dá obejít tímto stylopisem:

```
.codemirror-container.height-auto {
   // Disables CM's own scrollbars (was `100%`). Now CM is as
   // height as its content. It trigger PrimeVue <ScrollPanel>'s
   // scrollbars instead.
   height: max-content !important;
}
```

Bohužel to však rozbije dvě věci

- Klepnutí někde na konci textu a konci řádku nenastaví správně kurzor. Ten se nastaví někam nahoru.
- Editor nescrolluje dolů. Je možné psát "mimo obrazovku" dolů, aniž by se odscrolovalo dolů.

Proto pro tuto komponentu nepoužívejte ScrollPanell. Pomocí [simplescrollbars addonu](https://codemirror.net/5/demo/simplescrollbars.html) nastavujeme CM non-native scrollbary, které dále stylujeme co nejpodobněji těm ze ScrollPanelu.
 -->

<template>
  <Codemirror
    v-model:value="docStore.body"
    :options="cmOptions"
    placeholder="Every journey begins with a first step."
    @changes="onChanges"
    @blur="onBlur"
    @ready="onReady"
    original-style
    data-testid="cm"
  />
</template>

<script setup lang="ts">
// @ts-expect-error
import Codemirror from "codemirror-editor-vue3";

import "codemirror/addon/display/placeholder.js";

import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/scroll/simplescrollbars.css";

import "codemirror/mode/rst/rst.js";
// importovat další módy?

import { useDocStore } from "@/stores/DocStore";
import { computed, ref, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { logger } from "@/utils/logger";
import type { Editor } from "codemirror";

const docStore = useDocStore();

// https://codemirror.net/5/doc/manual.html#config
const cmOptions = computed(() => ({
  mode: docMime.value,
  theme: "deo",
  lineWrapping: true,
  scrollbarStyle: "simple",
  viewportMargin: Infinity
}));

// Maps file extension to MIME type. CM sets syntax highlighting and other features using MIME types.
const docMime = computed(() => {
  // Return MIME type corresponding to the CM mode
  // https://codemirror.net/5/mode/index.html
  switch (docStore.extension) {
    case "rst":
      return "text/x-rst"
    case "md":
      return "text/x-markdown"
    case "py":
      return "text/x-python"
    case "json":
      return "application/json"
    case "html":
      return "text/html"
    case "css":
      return "text/css"
    case "js":
      return "text/javascript"
    default:
      return "text/plain"
  }
})

/**
 * Trigger save after 2500 ms after last request OR each 5000 ms at max.
 */
const _debouncedSave = useDebounceFn(
  async () => {
    await docStore.save();
  },
  2500,
  { maxWait: 5000 }
);

async function onBlur() {
  logger.trace("Editor.vue onBlur")
  if (docStore.isDirty) await _debouncedSave();
}

// *** Document switching ******************************************************

// Unfortunatelly, when CodeMirror v-model has changed, it triggers
// onChanges(). This is the flag preventing calling save after an user
// has switched to another doc.

const docSwitchedFlag = ref(false)

watch(() => docStore.id, (newId, oldId) => {
  if (newId !== oldId) {
    logger.trace("Switching to another document")

    // Switch flag
    docSwitchedFlag.value = !docSwitchedFlag.value

    // Clear CM history to prevent undoing/redoing changes from previous doc
    uiStore.clearCmHistory()
  }
})

async function onChanges() {
  logger.trace("Editor.vue onChanges")

  // On every change, update history used to disabling Undo/Redo buttons
  uiStore.updateCmHistory()

  if (docSwitchedFlag.value) {
    logger.trace("Ignoring editor onChanges between switching docs")
    docSwitchedFlag.value = false    // null the flag
    return
  }

  docStore.isDirty = true;
  await _debouncedSave();
}

// *** Share CM instance *******************************************************
// https://rennzhang.github.io/codemirror-editor-vue3/supplementary/instance#obtained-from-the-component-ref

import { useUIStore } from "@/stores/UIStore";
const uiStore = useUIStore()

const onReady = (cm: Editor) => {
  uiStore.cmInstance = cm;
  uiStore.cmInstance.getDoc().clearHistory()
}
</script>

<style lang="scss">
.CodeMirror-code {
  // Larger than default
  font-size: 1rem;
}

.CodeMirror {
  height: auto;
}

// *****************************************************************************
// Mimics the look of PrimeVue ScrollPanel scrollbars
// *****************************************************************************

.CodeMirror-simplescroll-horizontal, .CodeMirror-simplescroll-vertical {
  background: none;
  width: 10px;
}
.CodeMirror-simplescroll-vertical {
  width: 10px;
}
.CodeMirror-simplescroll-horizontal {
  height: 10px;
}
.CodeMirror-simplescroll-horizontal div, .CodeMirror-simplescroll-vertical div {
  border: none;
  border-radius: 3px;
  background: var(--surface-300);
}

// *****************************************************************************
// Documatt CodeMirror theme "deo".
// Roughly based on builtin neo (https://codemirror.net/theme/neo.css)
// *****************************************************************************

.cm-s-deo {
  /* Color scheme */
  &.CodeMirror {
    background-color: #ffffff;
    color: #2e383c;
    line-height: 1.4375;
  }

  .cm-comment {
    color: green;
    font-style: italic;
  }

  .cm-keyword, .cm-s-neo .cm-property {
    color: #1d75b3;
  }

  .cm-atom, .cm-s-neo .cm-number {
    color: #75438a;
  }

  .cm-node, .cm-s-neo .cm-tag {
    color: #9c3328;
  }

  .cm-string {
    color: #b35e14;
  }

  .cm-variable, .cm-s-neo .cm-qualifier {
    color: #047d65;
  }

  .cm-string-2 { // inline literal
    color: #ff3860;
    background-color: whitesmoke;
    border-radius: 5px;
    padding: 2px;
  }

  .cm-header {
    color: #1d75b3;
  }

  .cm-header-1 { font-size: 150%; }
  .cm-header-2 { font-size: 130%; }
  .cm-header-3 { font-size: 120%; }
  .cm-header-4 { font-size: 110%; }
  .cm-header-5 { font-size: 100%; }
  .cm-header-6 { font-size: 90%; }

  .cm-link {
    color: darkgrey;
    text-decoration-color: darkgrey;

    &::after {
      //content: url("/icons/icons8-external-link-16.png");
      //display: inline-block;
    }
  }

  /* Editor styling */
  pre {
    padding: 0;
    font-size: larger;
  }

  .CodeMirror-gutters {
    border: none;
    border-right: 10px solid transparent;
    background-color: transparent;
  }

  .CodeMirror-linenumber {
    padding: 0;
    color: #e0e2e5;
  }

  .CodeMirror-guttermarker {
    color: #1d75b3;
  }

  .CodeMirror-guttermarker-subtle {
    color: #e0e2e5;
  }

  &.CodeMirror-empty {
    color: #999;
  }
}
</style>
