<!-- Customized PrimeVue ScrollPanel -->

<template>
  <ScrollPanel
    class="w-full h-full"
    :pt="{
      // Clearly visible scrollbars
      barY: { class: 'bg-primary' },
      barX: { class: 'bg-primary' },
    }"
  >
    <slot></slot>
  </ScrollPanel>
</template>

<script setup lang="ts">
import ScrollPanel from "primevue/scrollpanel";
</script>

<style scoped></style>
