<template>
  <div class="tooltip tooltip-left" data-tip="Switch syntax">
    <select
      :value="previewStore.syntax"
      class="select select-ghost text-base"
      @change="onSyntaxChange"
    >
      <option :value="Syntax.RST" selected>reStructuredText</option>
      <option :value="Syntax.MD">Markdown</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const previewStore = usePreviewStore();

// *** Warn/prevent before syntax switching ********************************************

let previousSyntax = previewStore.syntax;

function onSyntaxChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const confirmed = window.confirm(
    "Switching a syntax will clear your content. Do you want to continue?",
  );
  if (confirmed) {
    const newSyntax =
      Syntax[selectElement.value.toUpperCase() as keyof typeof Syntax];
    previewStore.syntax = newSyntax;
    previousSyntax = newSyntax;
  } else {
    // Prevent the change by resetting the value
    selectElement.value = previousSyntax;
  }
}
</script>
