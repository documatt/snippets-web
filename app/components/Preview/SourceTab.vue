<script setup lang="ts">
const props = defineProps<{ source: string | undefined }>();
</script>

<template>
  <div class="font-mono overflow-auto h-full whitespace-pre-wrap">
    {{ props.source }}
  </div>
</template>
