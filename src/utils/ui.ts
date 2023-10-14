/**
 * UI-related constants and utils.
 */

// *****************************************************************************
// Layouts definitions
// *****************************************************************************

export interface Layout {
  label: string;
  icon: string;
  // Total width should be 100
  explorerSize: number,
  editorSize: number,
  previewSize: number,
}

export const explorerLayout: Layout = {
  label: "Explorer",
  icon: "icon--ci icon--ci--bar-left",
  explorerSize: 25,
  editorSize: 75,
  previewSize: 0,
};

export const previewLayout: Layout = {
  label: "Preview",
  icon: "icon--ci icon--ci--bar-right",
  explorerSize: 0,
  editorSize: 70,
  previewSize: 30,
};

export const threeColumnLayout: Layout = {
  label: "Three column",
  icon: "icon--bi icon--bi--layout-three-columns",
  explorerSize: 20,
  editorSize: 60,
  previewSize: 20,
};

export const editorOnlyLayout: Layout = {
  label: "Editor only",
  icon: "pi pi-stop",
  explorerSize: 0,
  editorSize: 100,
  previewSize: 0,
};

export const allLayouts = [
  explorerLayout,
  previewLayout,
  threeColumnLayout,
  editorOnlyLayout,
];

export const defaultLayout = explorerLayout;
