<script setup>
// Import button because plugins/primevue.ts containing Button import isn't executed when displaying error page
import Button from "primevue/button";

useSeoMeta({
  title: "Oops"
})

const error = useError();

const handleError = () => {
  clearError({
    redirect: "/",
  });
};

const heading = computed(() => {
  if (error.value.statusCode === 404) {
    return `404 Not Found`
  } else {
    if (error.value.statusMessage)
      return `${error.value.statusCode} ${error.value.statusMessage}`
    else
      return `${error.value.statusCode}`
  }
})

const details = computed(() => {
  let msg = `Status code: ${error.value.statusCode}`

  if (error.value.statusMessage)
    msg += ` - Status message: ${error.value.statusMessage}`

  if (error.value.message)
    msg += ` - Message: ${error.value.message}`

  return msg
})

// TODO: Report to Sentry
</script>

<template>
    <div class="">
        <div class="flex flex-column lg:flex-row gap-7 justify-content-center align-content-center align-items-center h-screen">
            <div class="text-center lg:text-right">
                <h1 class="text-6xl my-0 py-0">Error {{ heading }}</h1>
                <p class="text-700 text-3xl my-0 py-0">
                  Our engineers have been notified!<br>
                  Please try again later and sorry.
                </p>
                <p>
                  {{ details }}
                </p>
                <Button type="button" label="Take me home" class="p-button-outlined" @click="handleError"></Button>
            </div>
            <div class="text-center lg:text-left">
                <img src="/404-rocket.png" alt="Image" class="w-8" />
                <br>
                <img src="/logo.svg" alt="Image" class="w-8" />
            </div>
        </div>
    </div>
</template>
