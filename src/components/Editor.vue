<script setup lang="ts">
import { Codemirror } from "vue-codemirror";

import { useDocStore } from "../stores/DocStore";

const docStore = useDocStore();

async function onBlur() {
  await docStore.save();
}
function onChanges() {
  docStore.isDirty = true;
}
</script>
<template>
  <codemirror
    v-model="docStore.body"
    placeholder="Every journey begins with a first step."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="4"
    @changes="onChanges"
    @blur="onBlur"
  />
</template>
