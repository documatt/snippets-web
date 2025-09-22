<script setup lang="ts">
const props = defineProps<{ source: string | undefined }>();
</script>

<template>
  <div class="h-full overflow-auto font-mono whitespace-pre-wrap">
    {{ props.source }}
  </div>
</template>
