<template>
  <div>
    <Tree
      :value="docsStore.treeNodes"
      v-model:selection-keys="selectedKey"
      selection-mode="single"
      @node-select="nodeSelected"
    />
  </div>
</template>

<script setup lang="ts">
import Tree, { TreeNode } from "primevue/tree";
import { ref } from "vue";
import { useDocStore } from "~/stores/DocStore";
import { useDocsStore } from "~/stores/DocsStore";

const docStore = useDocStore()
const docsStore = useDocsStore()

// To control the currently selected node.
// Because Tree is single selection mode, it will contain an object with single
// member, where name will be "key" from treeNodes, and value always `true` (as
// selected). E.g., `{ "index.rst": true }`.
const selectedKey = ref({
  [docStore.id]: true
});

// Handler when an node has been selected (may be the same).
async function nodeSelected(node: TreeNode) {
  // node.key is doc ID, e.g., "index.rst"
  const docId = node.key
  logger.info(`Switching to the '${docId}' doc`)
  await docStore.loadAndSetBody(docId)
}
</script>

<style scoped>
/* More dense display */
:deep(.p-tree) {
  margin: 0rem 0.1rem;
  border: none;
}
:deep(.p-treenode-content) {
  padding: 0.5rem 0;
}
:deep(.p-tree-toggler) {
  width: auto !important;
}
</style>
