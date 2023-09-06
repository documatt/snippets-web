<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const { texts } = useAppConfig();

const toast = useToast();
const name = "cookieConsent";
import { useStorage } from "@vueuse/core";

onMounted(() => {
  toast.add({
    severity: "info",
    group: name,
  });
});

const cookie = useStorage(name, false);

function onClose() {
  cookie.value = true;
}
</script>

<template>
  <div>
    <!-- Display only if we haven't consent or is missing -->
    <!-- w-8 = width: 66% -->
    <Toast
      v-if="!cookie"
      position="bottom-center"
      :group="name"
      :pt="{
        root: 'w-8',
      }"
      @close="onClose"
    >
      <!-- <template #closeicon>
        <i class="pi-icon pi-check-circle"></i>
      </template> -->
      <template #message>
        <!-- div needed because content is flex and NuxtLink and text before and after link will become members otherwise, i.e., justifying it to three columns  -->
        <div>
          To make Documatt work, we log some user data. By using Documatt, you
          agree to our
          <NuxtLink :to="texts.legalUrl"
            >Terms and Conditions</NuxtLink
          >, including cookie policy.
        </div>
      </template>
    </Toast>
  </div>
</template>
