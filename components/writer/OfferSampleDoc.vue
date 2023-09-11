<template>
  <div>
    <TransitionGroup name="p-message" tag="div">
      <Message v-if="isBlank">
        Wanna start with
        <a @click.prevent="setSampleDocument">sample document</a>?
      </Message>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
import Message from "primevue/message";
import { computed } from "vue";

// Read files to a string variable
// https://vitejs.dev/guide/assets.html#importing-asset-as-string
import sampleRst from '@/sampleDocuments/rst.rst?raw';
import sampleMd from '@/sampleDocuments/md.md?raw';

const docStore = useDocStore();

const isBlank = computed(() => !docStore.body);

async function setSampleDocument() {
  if (docStore.extension === "rst") docStore.body = sampleRst;
  if (docStore.extension === "md") docStore.body = sampleMd;
  await docStore.save()
}
</script>
