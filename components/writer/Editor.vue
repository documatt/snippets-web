<template>
  <codemirror
    v-model="docStore.body"
    placeholder="Every journey begins with a first step."
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="4"
    @change="onChange"
    @blur="onBlur"
    :extensions="extensions"
  />
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { useDocStore } from "@/stores/DocStore";
import { useDebounceFn } from '@vueuse/core';
import { EditorView } from "codemirror";

const extensions = [EditorView.lineWrapping]

const docStore = useDocStore();

/**
 * Trigger save after 2500 ms after last request OR each 5000 ms at max.
 */
const debouncedSave = useDebounceFn(async () => {
  await docStore.save()
}, 2500, { maxWait: 5000})

async function onBlur() {
  if (docStore.isDirty) debouncedSave();
}

function onChange() {
  docStore.isDirty = true;
  debouncedSave()
}
</script>