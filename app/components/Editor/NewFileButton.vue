<template>
  <div v-if="isEntering" class="flex items-center">
    <label class="input w-auto">
      <input
        ref="newFileInputElement"
        v-model="newFileStem"
        type="text"
        placeholder="new file"
        class="w-16"
        @keyup.enter="addNewFile"
      />
      <span class="label">.{{ previewStore.syntax }}</span>
    </label>
  </div>

  <div v-else class="flex items-center">
    <div class="tooltip tooltip-right" data-tip="Add new file">
      <Icon name="prime:plus" @click="isEntering = true" />
    </div>
  </div>
</template>

<script setup lang="ts">
const previewStore = usePreviewStore();

const isEntering = ref(false);
const newFileStem = ref("");
const newFileInputElement = useTemplateRef("newFileInputElement");

// Set focus on first render
useFocus(newFileInputElement, { initialValue: true });

// Add file when clicked outside
onClickOutside(newFileInputElement, addNewFile);

function addNewFile() {
  const stem = newFileStem.value;
  const filename = stem + "." + previewStore.syntax;

  // Nothing has been entered, back to NOT entering state
  if (!stem.trim()) {
    isEntering.value = false;
    return;
  }

  // Exist?
  if (filename in previewStore.files) {
    alert("Filename already exists");
    // Return back to NOT entering state
    isEntering.value = false;
    return;
  }

  // Add new blank file with that filename
  previewStore.files[filename] = "";

  // Return back to NOT entering state
  newFileStem.value = "";
  isEntering.value = false;
}
</script>
