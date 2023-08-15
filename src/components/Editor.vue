<script setup lang="ts">
import Textarea from "primevue/textarea";

import { useDocStore } from "../stores/DocStore";
import { storeToRefs } from "pinia";

let { body } = storeToRefs(useDocStore())

</script>
<template>
  <div class="m-3">

    <Textarea v-model="body" autoResize rows="5" cols="80" />
  </div>
</template>

<style scoped>
:deep(.p-inputtextarea) {
    font-family: monospace;
}
</style>