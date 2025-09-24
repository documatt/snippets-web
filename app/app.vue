<template>
  <div class="flex h-screen flex-col">
    <!-- header, topbar -->
    <Header />
    <Toolbar />
    <!-- editor, preview, console -->
    <div class="h-full overflow-y-auto">
      <splitpanes vertical class="default-theme">
        <pane size="50" min-size="20" class="p-2">
          <EditorPane />
        </pane>
        <pane size="50" min-size="20" class="p-2"><PreviewPane /></pane>
      </splitpanes>
    </div>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

// For performance, SEO meta tags will only be added during server-side rendering
if (import.meta.server) {
  useSeoMeta({
    title:
      "Snippets - Sphinx reStucturedText and Markdown online preview and editor",
    ogTitle: "Sphinx reStucturedText and Markdown online preview and editor",
    description:
      "Preview and edit reStructuredText or Markdown (MyST) documents online with Sphinx and Docutils without installing it.",
    ogDescription:
      "Preview and edit reStructuredText or Markdown (MyST) documents online with Sphinx and Docutils without installing it.",
    ogImage: "/images/og_image.png",
    twitterCard: "summary_large_image",
  });
}

// Boot Sphinx
const previewStore = usePreviewStore();
onMounted(() => {
  previewStore.bootPreview();
});
</script>

<style lang="css">
.default-theme.splitpanes .splitpanes__pane {
  background-color: transparent;
}
.default-theme.splitpanes .splitpanes__splitter:before,
.default-theme.splitpanes .splitpanes__splitter:after {
  background-color: var(--color-slate-400);
}
.default-theme.splitpanes--vertical > .splitpanes__splitter,
.default-theme .splitpanes--vertical > .splitpanes__splitter {
  border-left: 1px solid var(--color-slate-300);
}
</style>
