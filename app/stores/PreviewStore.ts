import type { PyodideAPI } from "pyodide";
import type { PreviewResult } from "~/utils/sphinx-preview";
import { SphinxPreviewRunner, Syntax } from "~/utils/sphinx-preview";

export enum PreviewStates {
  NotBooted = "NotBooted",
  Booting = "Booting",
  Idle = "Idle",
  InProgress = "InProgress",
}

// later <string, blob>
export type Files = Record<string, string>;

export const DEFAULT_SYNTAX = Syntax.RST;

// Files, at the beginning, contains only rootdoc and empty conf.py
function getInitialFiles(syntax: Syntax): Files {
  return { [getRootFilename(syntax)]: "", "conf.py": "" };
}

export const usePreviewStore = defineStore("preview", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  let pyodide: PyodideAPI | undefined = undefined;
  let sphinxpreview: ISphinxPreview | undefined = undefined;
  const uiStore = useUiStore();

  // ***************************************************************************
  // State
  // ***************************************************************************

  const state = ref<PreviewStates>(PreviewStates.NotBooted);
  const result = ref<PreviewResult>();
  const syntax = ref(DEFAULT_SYNTAX);
  const files = ref<Files>(getInitialFiles(DEFAULT_SYNTAX));

  // ***************************************************************************
  // State watchers
  // ***************************************************************************

  // Clean files when syntax changed
  watch(syntax, (newSyntax) => {
    console.log("syntax changed to", newSyntax);
    files.value = getInitialFiles(newSyntax);
    uiStore.activeDoc = getRootFilename(newSyntax);
  });

  // Rerun preview on change in files
  watch(files, async () => await debouncedRunPreview(), { deep: true });

  // ***************************************************************************
  // Getters
  // ***************************************************************************

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

    state.value = PreviewStates.InProgress;
    const runner = new SphinxPreviewRunner(
      pyodide!,
      sphinxpreview!,
      files.value,
      syntax.value,
    );
    // Bang!
    result.value = await runner.run();
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
    bootPreview,
    runPreview,
    debouncedRunPreview,
  };
});
