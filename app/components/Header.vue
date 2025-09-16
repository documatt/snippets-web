<template>
  <div
    class="bg-[#f8fafc] dark:bg-slate-800 py-2 px-6 flex gap-20 justify-between items-center"
  >
    <div class="flex gap-2 items-center">
      <a href="https://documatt.com">
        <NuxtImg
          src="/images/documatt-logo.svg"
          alt="Documatt logo"
          class="h-[1lh]"
        />
      </a>
      <span class="text-xl text-slate-700 mr-1">Snippets</span>
      <span class="text-sm text-slate-500"
        >reStructuredText and MyST Markdown preview</span
      >
    </div>

    <div class="flex gap-2 items-center">
      <HeaderSyntaxSwitcher />

      <div
        class="tooltip tooltip-left flex items-center gap-2"
        :data-tip="`Running on Sphinx ${sphinxVer}`"
      >
        <!-- <Icon
          name="simple-icons:sphinx"
          class="dark:text-slate-200 text-xl inline h-[0.75lh]"
        /> -->
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
        <span class="text-sm">{{ sphinxVer }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sphinxVer = "8.2.1";
</script>
