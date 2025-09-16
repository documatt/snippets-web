import type { PyodideAPI } from "pyodide";
import type { PreviewResult } from "~/utils/sphinx-preview";
import { runSphinxPreview } from "~/utils/sphinx-preview";

export enum PreviewStates {
  NotBooted = "NotBooted",
  Booting = "Booting",
  Idle = "Idle",
  InProgress = "InProgress",
}

// later <string, blob>
export type Files = Record<string, string>;

export const usePreviewStore = defineStore("preview", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  let pyodide: PyodideAPI | undefined = undefined;
  let sphinxpreview: ISphinxPreview | undefined = undefined;

  // ***************************************************************************
  // State
  // ***************************************************************************

  const state = ref<PreviewStates>(PreviewStates.NotBooted);
  const result = ref<PreviewResult>();
  const syntax = ref(Syntax.RST);
  const files = ref<Files>({});

  // ***************************************************************************
  // State watchers
  // ***************************************************************************

  // Clean files when syntax changed
  watch(syntax, (newVal) => {
    console.log("syntax changed to", newVal);
    files.value = {};
  });

  // Rerun preview on change in files
  watch(files, async () => await debouncedRunPreview(), { deep: true });

  // ***************************************************************************
  // Getters
  // ***************************************************************************
  const rootDocIsBlank = computed(() => {
    if (_hasNoFiles(files.value)) return true;
    const rootBody = files.value["index." + syntax.value];
    return rootBody === "" ? true : false;
  });

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  async function bootPreview() {
    state.value = PreviewStates.Booting;
    ({ pyodide, sphinxpreview } = await bootSphinxPreview());
    state.value = PreviewStates.Idle;
  }

  const debouncedRunPreview = useDebounceFn(runPreview, 250);

  async function runPreview() {
    await until(state).toBe(PreviewStates.Idle);

    const files2: Files = files.value;

    // If no files yet (`{}`) (on initial), create blank root document
    if (_hasNoFiles(files2)) {
      files2["index." + syntax.value] = "";
    }

    // Minimal Sphinx project needs blank conf.py
    files2["conf.py"] = "";

    // Bang!
    state.value = PreviewStates.InProgress;
    result.value = await runSphinxPreview(pyodide!, sphinxpreview!, files2);
    state.value = PreviewStates.Idle;
  }

  // ***************************************************************************
  // Expose
  // ***************************************************************************
  return {
    state,
    result,
    syntax,
    files,
    rootDocIsBlank,
    bootPreview,
    runPreview,
    debouncedRunPreview,
  };
});

function _hasNoFiles(files: Files) {
  return Object.keys(files).length == 0;
}
