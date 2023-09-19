<template>
  <div>
    <Breadcrumb
      :model="items"
      unstyled
      :pt="{
        root: 'ml-2',
        menu: 'list-none flex justify-content-start gap-2 pl-0 my-1 dm-sans-serif text-600',
        separator: 'text-500',
      }"
    >
      <!-- Slot to replace links with plain text -->
      <template #item="{ label, item, props }">
        <span v-if="item.icon" v-bind="props.icon" />
        <span v-bind="props.label">{{ label }}</span>
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "primevue/breadcrumb";
import { MenuItem } from "primevue/menuitem";
import { useDocStore } from "~/stores/DocStore";

const docStore = useDocStore()

/**  Array of MenuItems as expected by Breadcrumb component */
const items: Ref<MenuItem[]> = computed(()=> [{ label: docStore.id }])
</script>

<style scoped></style>
