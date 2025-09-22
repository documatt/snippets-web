<template>
  <div
    class="border-b border-slate-300 py-1 px-6 flex gap-2 items-center text-slate-700 dark:text-slate-300"
  >
    I want to preview

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

    using

    <NuxtImg
      src="/images/sphinx-logo.svg"
      alt="Sphinx logo"
      class="h-[0.75lh] inline dark:hidden"
    />
    <NuxtImg
      src="/images/sphinx-logo-dark.svg"
      alt="Sphinx logo"
      class="h-[0.75lh] inline not-dark:hidden"
    />

    Sphinx 8.2.1

    <!-- More info -->
    <!--
    <div class="dropdown dropdown-end">
      <div
        tabindex="0"
        role="button"
        class="btn btn-circle btn-ghost btn-xs text-base text-primary"
      >
        <Icon name="prime:info-circle" />
      </div>
      <div
        tabindex="0"
        class="card card-sm dropdown-content bg-base-100 rounded-box z-1 w-64 shadow-sm"
      >
        <div tabindex="0" class="card-body">
          <h2 class="card-title">You needed more info?</h2>
          <p>Here is a description!</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const previewStore = usePreviewStore();

// *** Warn/prevent before syntax switching ********************************************

let previousSyntax = previewStore.syntax;

function onSyntaxChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const confirmed = window.confirm(
    "Switching a syntax will clear your content. Do you want to continue?"
  );
  if (confirmed) {
    // Switch syntax
    const newSyntax = Syntax[selectElement.value as keyof typeof Syntax];
    previewStore.syntax = newSyntax;
    previousSyntax = newSyntax;
  } else {
    // Prevent the change by resetting the value
    selectElement.value = previousSyntax;
  }
}
</script>
