<template>
  <footer
    class="flex flex-col justify-between gap-4 border-t border-slate-300 px-6 py-2 text-sm text-slate-500 lg:flex-row"
  >
    <span
      >🚀 Do you want to try Sphinx as service?
      <a
        :href="appConfig.dcomUrl"
        class="link"
        data-rybbit-event="try_documatt_clicked"
        >Try Documatt, a worry-free Sphinx.</a
      >
    </span>

    <div class="text-primary hover:text-accent">
      <!-- <Icon name="emojione-v1:flag-for-czechia" /> -->

      Made with <Icon name="prime:heart" /> by
      <a :href="appConfig.dcomUrl" target="_blank" class="link">Documatt</a>

      <div class="ml-4 inline-flex gap-1.5">
        <a href="https://www.youtube.com/@Documatt" target="_blank"
          ><Icon name="fa-brands:youtube"
        /></a>
        <a href="https://www.linkedin.com/company/documattcom" target="_blank"
          ><Icon name="fa-brands:linkedin"
        /></a>
        <a href="https://github.com/documatt" target="_blank"
          ><Icon name="fa-brands:github"
        /></a>
        <a href="https://x.com/documattcom" target="_blank"
          ><Icon name="prime:twitter"
        /></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
</script>
