<template>
  <div
    class="flex flex-col items-center justify-between gap-2 border-b border-slate-300 px-6 py-1 text-slate-700 lg:flex-row dark:text-slate-300"
  >
    <!-- Left side -->
    <div class="flex items-center">
      <div>I want to preview</div>

      <div>
        <ToolbarSyntaxSwitcher />
      </div>

      <div>
        using

        <NuxtImg
          src="/images/sphinx-logo.svg"
          alt="Sphinx logo"
          class="inline h-[0.75lh] dark:hidden"
        />
        <NuxtImg
          src="/images/sphinx-logo-dark.svg"
          alt="Sphinx logo"
          class="inline h-[0.75lh] not-dark:hidden"
        />

        Sphinx 8.2.3
      </div>

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

    <!-- Right side -->
    <div class="flex items-center text-sm">
      <div class="tooltip tooltip-left" data-tip="Snippets are open-source!">
        <a href="https://github.com/documatt/snippets-web">
          <Icon name="prime:github" class="text-2xl text-slate-600" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
