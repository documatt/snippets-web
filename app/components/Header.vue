<template>
  <header
    class="bg-[#f8fafc] dark:bg-slate-800 py-1 px-6 flex gap-20 justify-between items-center border-b border-t border-slate-300 text-slate-500"
  >
    <!-- Left-side logo and motto -->
    <div class="flex gap-2 items-center">
      <a href="https://documatt.com">
        <NuxtImg
          src="/images/documatt-logo.svg"
          alt="Documatt logo"
          class="h-[0.7lh]"
        />
      </a>
      <h1 class="font-bold text-sm">
        reStructuredText and Markdown live preview
      </h1>
    </div>

    <!-- Righ-side buttons -->

    <div class="text-sm flex gap-2 items-center">
      <!-- More functions? Try Documatt -->

      More functions?
      <a href="https://documatt.com" target="_blank">
        <button
          class="btn btn-outline border-accent text-gray-100 hover:bg-primary hover:text-slate-200 bg-accent"
        >
          Try Documatt
          <Icon name="prime:arrow-right" />
        </button>
      </a>
    </div>
  </header>
</template>
