import { useBookStore } from "@/stores/BookStore";
import { useDocStore } from "@/stores/DocStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  // ***************************************************************************
  // Setup
  // ***************************************************************************

  // ***************************************************************************
  // State
  // ***************************************************************************

  // *** Pane widths ***********************************************************

  // type PaneWidths = [string, string];

  // const defaultPaneWidths: PaneWidths = ["col-9", "col-3"];

  // const paneWidthsList: PaneWidths[] = [
  //   // preview pane narrower than default
  //   // ["w-4", "xl:w-2"],
  //   ["col-11", "col-1"],
  //   defaultPaneWidths,
  //   // preview pane wider than default
  //   ["col-7", "col-5"],
  //   ["col-3", "col-9"],
  // ];

  // const paneWidths = shallowRef(defaultPaneWidths);

  interface Widths {
    writer: string;
    preview: string;
  }

  const defaultWidths: Widths = { writer: "col-9", preview: "col-3" };

  const widthsList: Widths[] = [
    // preview pane narrower than default
    // ["w-4", "xl:w-2"],
    { writer: "col-10", preview: "col-2" },
    defaultWidths,
    // preview pane wider than default
    { writer: "col-7", preview: "col-5" },
    { writer: "col-3", preview: "col-9" },
  ];

  const widths = ref(defaultWidths);

  // *** Preview pane size *****************************************************

  const previewVisible = ref(false);

  function _findCurrentWidthsIndex() {
    return widthsList.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(widths.value)
    );
  }

  function changePreviewSize(step: -1 | 1) {
    const currentIndex = _findCurrentWidthsIndex();

    if (currentIndex == -1)
      showError(new Error("UI handling preview pane width"));

    widths.value = widthsList[currentIndex + step];
  }

  // +1 because `length` one higher than the highest index in the array
  const cannotWiderPreview = computed(() => {
    // +1 because `length` one higher than the highest index in the array
    return _findCurrentWidthsIndex() + 1 === widthsList.length
  });

  const cannotNarrowPreview = computed(() => {
    return _findCurrentWidthsIndex() === 0
  });

  // ***************************************************************************
  // Actions
  // ***************************************************************************

  // ***************************************************************************
  // Expose
  // ***************************************************************************

  return {
    previewVisible,
    widths,
    cannotNarrowPreview,
    cannotWiderPreview,
    changePreviewSize,
  };
});
