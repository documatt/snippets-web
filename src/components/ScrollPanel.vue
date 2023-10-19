<!-- Customized PrimeVue ScrollPanel -->

<template>
  <ScrollPanel
    class="w-full max-w-full h-full max-h-full"
    :pt="{
      // Clearly visible scrollbars
      barY: { class: 'surface-400' },
      barX: { class: 'surface-400' },
    }"
  >
    <slot></slot>
  </ScrollPanel>
</template>

<script setup lang="ts">
import ScrollPanel from "primevue/scrollpanel";
</script>

<style scoped></style>
