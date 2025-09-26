<template>
  <div class="tabs tabs-border h-full">
    <!-- Tabs for files except conf.py -->
    <template v-for="(_, filename) in previewStore.files" :key="filename">
      <template v-if="filename !== 'conf.py'">
        <label class="tab group" @click="uiStore.activeDoc = filename">
          {{ filename }}
          <input
            :ref="filename"
            type="radio"
            name="editor"
            :checked="uiStore.activeDoc === filename"
          />
          <EditorDeleteFileButton
            :filename="filename"
            class="hidden! group-hover:block!"
          />
        </label>
        <div class="tab-content p-3">
          <EditorTemplateOffer :filename="filename" />
          <EditorText :filename="filename" />
        </div>
      </template>
    </template>
    <EditorNewFileButton />
  </div>
</template>

<script lang="ts" setup>
const previewStore = usePreviewStore();
const uiStore = useUiStore();
</script>
