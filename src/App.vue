<script setup lang="ts">
import { ref } from "vue";

import { useToast } from "primevue/usetoast";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";

const text = ref();

const toast = useToast();

const greet = () => {
  toast.add({
    severity: "info",
    summary: "Summary",
    detail: `I am a detail. Text is '${text.value}'`
  });
};
</script>

<template>
  <Toast></Toast>
  <div class="container">
    <span class="p-float-label">
      <InputText id="txt" v-model="text" />
      <label for="txt">Username</label>
    </span>

    <Button label="Greet" @click="greet" icon="pi pi-user"></Button>
  </div>

  <div>
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div class="text-900 font-bold text-6xl mb-4 text-center">
        Pricing Plans
      </div>
      <div class="text-700 text-xl mb-6 text-center line-height-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam
        eligendi quos.
      </div>

      <div class="grid">
        <div class="col-12 lg:col-4">
          <div class="p-3 h-full">
            <div
              class="shadow-2 p-3 h-full flex flex-column surface-card"
              style="border-radius: 6px"
            >
              <div class="text-900 font-medium text-xl mb-2">Basic</div>
              <div class="text-600">Plan description</div>
              <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
              <div class="flex align-items-center">
                <span class="font-bold text-2xl text-900">$9</span>
                <span class="ml-2 font-medium text-600">per month</span>
              </div>
              <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
              <ul class="list-none p-0 m-0 flex-grow-1">
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Arcu vitae elementum</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Dui faucibus in ornare</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Morbi tincidunt augue</span>
                </li>
              </ul>
              <hr
                class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto"
              />
              <Button label="Buy Now" class="p-3 w-full mt-auto"></Button>
            </div>
          </div>
        </div>

        <div class="col-12 lg:col-4">
          <div class="p-3 h-full">
            <div
              class="shadow-2 p-3 h-full flex flex-column surface-card"
              style="border-radius: 6px"
            >
              <div class="text-900 font-medium text-xl mb-2">Premium</div>
              <div class="text-600">Plan description</div>
              <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
              <div class="flex align-items-center">
                <span class="font-bold text-2xl text-900">$29</span>
                <span class="ml-2 font-medium text-600">per month</span>
              </div>
              <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
              <ul class="list-none p-0 m-0 flex-grow-1">
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Arcu vitae elementum</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Dui faucibus in ornare</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Morbi tincidunt augue</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Duis ultricies lacus sed</span>
                </li>
              </ul>
              <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
              <Button label="Buy Now" class="p-3 w-full"></Button>
            </div>
          </div>
        </div>

        <div class="col-12 lg:col-4">
          <div class="p-3 h-full">
            <div
              class="shadow-2 p-3 flex flex-column surface-card"
              style="border-radius: 6px"
            >
              <div class="text-900 font-medium text-xl mb-2">Enterprise</div>
              <div class="text-600">Plan description</div>
              <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
              <div class="flex align-items-center">
                <span class="font-bold text-2xl text-900">$49</span>
                <span class="ml-2 font-medium text-600">per month</span>
              </div>
              <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
              <ul class="list-none p-0 m-0 flex-grow-1">
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Arcu vitae elementum</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Dui faucibus in ornare</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Morbi tincidunt augue</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Duis ultricies lacus sed</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Imperdiet proin</span>
                </li>
                <li class="flex align-items-center mb-3">
                  <i class="pi pi-check-circle text-green-500 mr-2"></i>
                  <span>Nisi scelerisque</span>
                </li>
              </ul>
              <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
              <Button
                label="Buy Now"
                class="p-3 w-full p-button-outlined"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
