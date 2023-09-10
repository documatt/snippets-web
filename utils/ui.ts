/**
 * UI-related constants and utils.
 */

// *****************************************************************************
// Layouts definitions
// *****************************************************************************

export interface Layout {
  label: string;
  icon: string;
  showExplorer: boolean;
  showPreview: boolean;
}

export const explorerEditorLayout: Layout = {
  label: "Explorer on the left",
  icon: "pi pi-arrow-left",
  showExplorer: true,
  showPreview: false,
};

export const editorPreviewLayout: Layout = {
  label: "Preview on the right",
  icon: "pi pi-arrow-right",
  showExplorer: false,
  showPreview: true,
};

export const explorerEditorPreviewLayout: Layout = {
  label: "Three column",
  icon: "pi pi-table",
  showExplorer: true,
  showPreview: true,
};

export const editorOnlyLayout: Layout = {
  label: "Editor only",
  icon: "pi pi-stop",
  showExplorer: false,
  showPreview: false,
};

export const layouts = [
  explorerEditorLayout,
  editorPreviewLayout,
  explorerEditorPreviewLayout,
  editorOnlyLayout,
];

export const defaultLayout = explorerEditorLayout;
