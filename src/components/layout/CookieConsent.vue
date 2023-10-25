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
        <!-- div needed because content is flex and link and text before and after link will become members otherwise, i.e., justifying it to three columns  -->
        <div>
          To make Documatt work, we log some user data. By using Documatt, you
          agree to our <a :href="texts.legalUrl" target="_blank">Terms and Conditions</a>,
          including cookie policy.
        </div>
      </template>
    </Toast>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import texts from "@/utils/texts"

const toast = useToast();
const name = "cookieConsent";
import { useStorage } from "@vueuse/core";
import { onMounted } from "vue";

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
