<template>
  <Tree :value="nodes"></Tree>
</template>

<script setup lang="ts">
import Tree from "primevue/tree";
import { onMounted, ref } from "vue";

const nodes = ref([
  {
    key: "0",
    label: "index.rst",
    data: "Documents Folder",
    icon: "pi pi-file"
  },
  {
    key: "0",
    label: "conf.py",
    data: "Documents Folder",
    icon: "pi pi-file"
  },
  {
    key: "0",
    label: ".snippets.json",
    data: "Documents Folder",
    icon: "pi pi-file"
  }
]);
</script>