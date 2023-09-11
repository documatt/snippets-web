<template>
  <div>
    <Breadcrumb :home="home" :model="items" />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "primevue/breadcrumb";
import { ref } from "vue";

const home = ref({
  icon: "pi pi-home",
  to: "/"
});
const items = ref([{ label: "intro" }, { label: "getting-started.md" }]);
</script>