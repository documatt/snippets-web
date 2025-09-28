import type { PyodideAPI } from "pyodide";
import type { PreviewResult } from "~/utils/sphinx-preview";
import { SphinxPreviewRunner, Syntax } from "~/utils/sphinx-preview";

export enum PreviewStates {
  NotBooted = "NotBooted",
  Booting = "Booting",
  Idle = "Idle",
  InProgress = "InProgress",
}

/**
 * Mapping of filename to its content as string.
 */
// later <string, blob>
export type Files = Record<string, string>;

export const DEFAULT_SYNTAX = Syntax.RST;

// Files, at the beginning, contains only rootdoc and empty conf.py
export function getInitialFiles(syntax: Syntax): Files {
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
  /** Undefined when not shared. */
  const shareHash = ref<string>();

  // ***************************************************************************
  // State watchers
  // ***************************************************************************

  // Clean files when syntax changed
  watch(syntax, (newSyntax) => {
    console.log("syntax changed to", newSyntax);
    files.value = getInitialFiles(newSyntax);
    uiStore.activeDoc = getRootFilename(newSyntax);
  });

  // On change in files
  watch(
    files,
    async () => {
      // Rerun preview on change in files
      await debouncedRunPreview();

      // Unset share hash
      shareHash.value = undefined;
    },
    { deep: true },
  );

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
    shareHash,
    bootPreview,
    runPreview,
    debouncedRunPreview,
  };
});
