<template>
  <footer
    class="upper-shadow bg-dm-mocca text-sm flex p-2 grid grid-nogutter"
  >
    <div class="col-12 lg:col-3 text-600">
      &copy; {{ year }}, {{ texts.companyName }}
      &mdash;
      <NuxtLink :to="texts.legalUrl" target="_blank">Legal</NuxtLink>
    </div>

    <div class="col-12 lg:col-6 dm-blue">{{ texts.motto }}</div>

    <div class="col-12 lg:col-3 text-500 flex align-items-center justify-content-start">
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
