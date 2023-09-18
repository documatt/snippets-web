<template>
  <footer
    class="upper-shadow bg-dm-mocca text-sm p-2 flex justify-content-between"
  >
    <div class="text-600 flex gap-2">
      <NuxtLink to="https://documatt.com" target="_blank"><img src="/logo.svg" class="w-4rem" alt="Documatt logo"></NuxtLink>

      &copy; {{ year }}, {{ texts.companyName }}

      <NuxtLink :to="texts.legalUrl" target="_blank">Legal</NuxtLink>
    </div>

    <!-- Hidden on < LG -->
    <div class="dm-blue hidden lg:block">{{ texts.motto }}</div>

    <div class="text-500">
      <NuxtLink to="https://twitter.com/documattcom" target="_blank">
        <i class="pi pi-twitter text-xl mr-2"></i>
      </NuxtLink>
      <NuxtLink to="https://facebook.com/documattcom" target="_blank">
        <i class="pi pi-facebook text-xl mr-2"></i>
      </NuxtLink>
      <NuxtLink href="https://github.com/documatt" target="_blank">
        <i class="pi pi-github text-xl mr-2"></i>
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { texts } = useAppConfig();

// Current year automatically updated
const year = useDateFormat(useNow(), "YYYY");
</script>

<style scoped lang="scss">
a {
  @include styleclass(
    "text-600 hover:text-900 transition-duration-150 cursor-pointer"
  );
}
</style>
