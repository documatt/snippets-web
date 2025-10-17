<!-- Button which indicates ready, running, error and finished states by button color, icon, text, and tooltip -->
<template>
  <ClientOnly>
    <div class="tooltip tooltip-left" :data-tip="props.desc[status].tooltip">
      <button
        class="btn"
        :class="status === 'error' ? 'btn-error' : 'btn-info'"
        :disabled="props.disabled"
        @click="refresh()"
      >
        <Icon
          :name="props.desc[status].icon"
          :class="status === 'pending' ? 'animate-spin' : ''"
        />
        {{ props.desc[status].label }}
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { AsyncDataRequestStatus, NuxtApp } from "#app";

const props = defineProps<{
  // the same signature as useAsyncData() handler
  handler: (ctx?: NuxtApp) => Promise<unknown>;
  desc: ButtonDescription;
  disabled: boolean;
}>();

export type ButtonDescription = {
  [status in AsyncDataRequestStatus]: {
    tooltip: string;
    icon: string;
    label: string;
  };
};

const { error, pending, data, status, refresh } = await useAsyncData(
  props.handler,
  {
    server: false,
    immediate: false,
  },
);
</script>
