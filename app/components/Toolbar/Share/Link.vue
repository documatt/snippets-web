<!-- Show share hash, if shared. Click a link to copy to clipboard. -->
<template>
  <div
    v-if="previewStore.shareHash"
    class="tooltip tooltip-right"
    :data-tip="copied ? 'Copied ✨✨' : 'Copy to clipboard'"
    @click="copy(absUrl!)"
  >
    <a
      class="pointer-events-none"
      :href="relUrl"
      tabindex="-1"
      aria-disabled="true"
      @click.prevent
    >
      <Icon name="prime:link" class="relative left-1 text-sm" />
      {{ relUrl }}
    </a>
  </div>
</template>

<script setup lang="ts">
const previewStore = usePreviewStore();
const { copied, copy } = useClipboard();
const { absUrl, relUrl } = useShareUrl();
</script>
