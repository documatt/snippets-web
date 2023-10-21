<!-- Preview HTML itself -->

<template>
  <div class="root" ref="targetRef">
    <!-- not previewable -->
    <template v-if="!previewStore.isPreviewable">
      <div class="error" data-testid="error-message">
        This file type is not previewable
        <i class="pi pi-ban"></i>
      </div>
    </template>

    <!-- blank -->
    <template v-else-if="isBlank">
      <div class="error" data-testid="error-message">
        Nothing to preview
        <i class="pi pi-ban"></i>
      </div>
    </template>

    <!-- very first preview attempt (blur empty markup has no sense) -->
    <template v-else-if="isFirstTime">
      <div class="error" data-testid="error-message">
        Wait a sec
        <i class="pi pi-clock"></i>
      </div>
    </template>

    <!-- failed -->
    <template v-else-if="previewStore.isInError">
      <div class="error" data-testid="error-message">
        <span>
          Preview failed
          <Button
            type="button"
            label="Try again"
            severity="secondary"
            outlined
            @click="previewStore.refresh()"
          ></Button>
        </span>
        <i class="pi pi-exclamation-triangle"></i>
      </div>
    </template>

    <!-- preview -->
    <template v-else>
      <!--
      Adds
      * `blurry` class if getter toBlurry is true
      * `preview-body` class always
      * class with file extension in the name, e.g. `preview-body-md`
       -->
      <div
        :class="[{ blurry: toBlurry }, 'preview-body', extensionClass]"
        v-html="previewStore.body"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useDocStore } from '@/stores/DocStore'
import { usePreviewStore } from '@/stores/PreviewStore'
import { useUIStore } from '@/stores/UIStore'
import { logger } from '@/utils/logger'
import Button from 'primevue/button'
import { computed, ref, watch } from 'vue'

const docStore = useDocStore()
const previewStore = usePreviewStore()

// Read "!expression" as non-empty (has a value other than JS falsies
// like `null`, `undefined`, or `""`).
const isBlank = computed(() => !docStore.body && !previewStore.isInProgress)
const isFirstTime = computed(() => (!docStore.body || !previewStore.body) && previewStore.isInProgress)
const toBlurry = computed(() => docStore.isDirty || docStore.isSaving || previewStore.isInProgress)

// adds CSS class like "preview-body-rst" for more precious styling
const extensionClass = computed(() => 'preview-body-' + docStore.extension)

// *** Tracking visibility *****************************************************

// Template ref to component
const targetRef = ref(null)

// Update UIStore.previewIsVisible
const uiStore = useUIStore()
watch(() => uiStore.layout.previewSize, (newWidth) => {
  const val = newWidth > 0
  logger.trace(`Setting uiStore.isPreviewVisible to ${val} because it is ${newWidth} wide`)
  uiStore.previewIsVisible = val
})
</script>

<style scoped lang="scss">
div.root {
  font-family: 'Playfair Display', serif;
}
div.error {
  @include styleclass(
    'p-4 text-600 text-4xl h-screen flex justify-content-center align-items-center gap-3'
  );
  p {
    text-align: center;
  }
  i.pi {
    @include styleclass('text-3xl');
  }
}
.blurry {
  filter: blur(2px);
}

// *****************************************************************************
// Preview body styles
// *****************************************************************************
// All file types
.preview-body {
  // *** RST *******************************************************************
  .preview-body-rst {
  }

  // *** MD ********************************************************************
  .preview-body-md {
  }

  // .preview-body-<extension> {}
}
</style>
