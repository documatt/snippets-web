<script setup lang="ts">
import { HOME, NOT_FOUND } from '@/utils/routeNames';
import Button from 'primevue/button';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

function takeMeHome() {
  window.location.replace("/")
}

const title = computed(()=>{
  if (route.name == NOT_FOUND)
    return "Not Found :-("
  else
    return "Error :-("
})

const desc = computed(()=>{
  if (route.name == NOT_FOUND)
    return "The page you requested doesn't exist."
  else
    return "Our engineers have been notified! Please try again later and sorry."
})

const details = computed(()=>{
  if (route.name == NOT_FOUND)
    return "Double check URL or go back."
  else
    return "If you are brave, the details can be found in the browser console."
})
</script>

<template>
  <div
    class="flex flex-column lg:flex-row gap-7 justify-content-center align-content-center align-items-center h-screen"
  >
    <div class="text-center lg:text-right">
      <h1 data-testid="error-title" class="text-6xl my-0 py-0">{{ title }}</h1>
      <p class="text-700 text-3xl my-0 py-0">
        {{ desc }}

      </p>
      <p>
        {{ details }}
      </p>
      <Button
        type="button"
        label="Take me home"
        class="p-button-outlined"
        @click="takeMeHome"
      ></Button>
    </div>
    <div class="text-center lg:text-left">
      <img src="/404-rocket.png" alt="Image" class="w-8" />
      <br />
      <img src="/logo.svg" alt="Image" class="w-8" />
    </div>
  </div>
</template>
