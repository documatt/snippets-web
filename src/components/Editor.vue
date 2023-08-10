<script setup lang="ts">
import Textarea from "primevue/textarea";
import { ref } from "vue";

let value = ref("I am simple RST editor");
</script>
<template>
  <div>
    <Textarea v-model="value" autoResize rows="5" cols="80" />
  </div>
</template>

<style scoped>
:deep(.p-inputtextarea) {
    font-family: monospace;
}
</style>