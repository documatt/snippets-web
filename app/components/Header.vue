<template>
  <header
    class="flex flex-col items-center justify-between gap-4 border-t border-b border-slate-300 bg-[#f8fafc] px-6 py-1 text-slate-500 lg:flex-row dark:bg-slate-800 dark:text-slate-400"
  >
    <!-- Left-side logo and motto -->
    <div class="flex items-center">
      <NuxtImg
        src="/images/snippets-logo.svg"
        alt="Documatt Snippets logo"
        class="w-12"
      />
      <h1 class="text-primary text-xl font-bold">Snippets</h1>
      <h1 class="ml-4 text-sm font-bold">
        Edit, preview and learn reStructuredText and Markdown.
      </h1>
    </div>

    <!-- Righ-side buttons -->

    <div class="flex items-center gap-2 text-sm">
      <!-- More functions? Try Documatt -->

      More functions?
      <a href="https://documatt.com" target="_blank">
        <button
          class="btn btn-dash hover:bg-primary text-slate-500 hover:text-slate-200"
        >
          Try Documatt
          <Icon name="prime:arrow-right" />
        </button>
      </a>
    </div>
  </header>
</template>
