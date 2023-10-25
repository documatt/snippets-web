<template>
  <!-- Leftbar upper menu -->
  <ul id="leftbar-upper-menu">
    <li v-for="item in leftbarUpperMenu" :key="item.label">
      <RouterLink :to="{ name: item.name }" v-tooltip="item.label" v-ripple>
        <!-- <a v-ripple v-tooltip="item.label" :class="{ active: item.active}"> -->
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </RouterLink>
      <!-- </a> -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import { WRITER, SHARE, HELP } from '@/utils/routeNames'
import { ref } from 'vue'

const leftbarUpperMenu = ref([
  // { label: "Home", icon: "pi pi-home", name: HOME },
  { label: 'Write', icon: 'pi pi-file-edit', name: WRITER },
  { label: 'Share', icon: 'pi pi-share-alt', name: SHARE },
  { label: 'Help', icon: 'pi pi-question-circle', name: HELP }
])
</script>

<style scoped lang="scss">
ul#leftbar-upper-menu {
  @include styleclass("list-none p-0 m-0");
  a {
    @include styleclass(
      "flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple no-underline"
    );
    &.router-link-active {
      @include styleclass(
        "text-blue-600 border-blue-600 surface-100"
      );
    }
    // Icons
    i {
      @include styleclass("mr-2 lg:mr-0 text-base lg:text-2xl");
    }
    // Label on > LG
    span {
      @include styleclass("font-medium inline text-base lg:text-xs lg:hidden");
    }
  }
}
</style>
