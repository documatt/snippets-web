<script setup lang="ts">
const { texts } = useAppConfig();

// Current year automatically updated
const year = useDateFormat(useNow(), "YYYY");
</script>

<template>
  <footer class="upper-shadow bg-dm-mocca">
    <div class="container">
      <div class="grid surface-border">
        <div class="col-12 lg:col-6 lg:border-right-1 surface-border">
          <img
            src="/logo.svg"
            class="w-9rem mx-auto lg:mx-0"
            :alt="texts.motto"
          />
          <span class="block mt-4 dm-blue">{{ texts.mottoLong }}</span>
          <span class="block mt-4 text-600"
            >&copy; {{ year }}, {{ texts.companyName }}
            &mdash;
            <NuxtLink :to="texts.legalUrl">Legal</NuxtLink>
          </span>
          <span class="text-500 block mt-4">
            <div class="flex align-items-center justify-content-start">
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
          </span>
        </div>

        <!-- Products & Services -->
        <div
          class="col-12 md:col-6 lg:col-3 mt-4 lg:mt-0 lg:pl-4 flex flex-column"
        >
          <span class="text-xl font-medium block">Products and Services</span>
          <ul class="list-none p-0">
            <li><NuxtLink to="/">What is Documatt</NuxtLink></li>
            <li><NuxtLink to="/features/">Main Features</NuxtLink></li>
            <li><NuxtLink to="/solution/">Solutions</NuxtLink></li>
            <li><NuxtLink to="/services/">Professional Services</NuxtLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div
          class="col-12 lg:col-3 md:col-6 flex mt-4 lg:mt-0 lg:pl-4 flex-column"
        >
          <span class="text-xl font-medium block">Company</span>
          <ul class="list-none p-0">
            <li><NuxtLink to="/about/company">About</NuxtLink></li>
            <li><NuxtLink to="/about/contact">Contact</NuxtLink></li>
            <li><NuxtLink to="/blog/">Blog</NuxtLink></li>
            <li><NuxtLink to="/about/opensource">Open source</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
a {
  @include styleclass(
    "text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3"
  );
}

ul a {
  display: block;
}
</style>
