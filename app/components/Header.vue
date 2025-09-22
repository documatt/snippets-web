<template>
  <header
    class="flex items-center justify-between gap-20 border-t border-b border-slate-300 bg-[#f8fafc] px-6 py-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
  >
    <!-- Left-side logo and motto -->
    <div class="flex items-center gap-2">
      <a href="https://documatt.com">
        <NuxtImg
          src="/images/documatt-logo.svg"
          alt="Documatt logo"
          class="h-[0.7lh]"
        />
      </a>
      <h1 class="text-sm font-bold">
        reStructuredText and Markdown live preview
      </h1>
    </div>

    <!-- Righ-side buttons -->

    <div class="flex items-center gap-2 text-sm">
      <!-- More functions? Try Documatt -->

      More functions?
      <a href="https://documatt.com" target="_blank">
        <button
          class="btn btn-outline border-accent hover:bg-primary bg-accent text-gray-100 hover:text-slate-200"
        >
          Try Documatt
          <Icon name="prime:arrow-right" />
        </button>
      </a>
    </div>
  </header>
</template>
