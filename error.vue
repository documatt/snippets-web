<script setup>
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
  if (error.value.statusCode === 404)
    return `404 Not Found`
  else
    return `${error.value.statusCode} ${error.value.statusMessage}`
})

const details = computed(() => {
  let msg = `Status code: ${error.value.statusCode} - Status message: ${error.value.statusMessage}`

  if (error.statusMessage !== error.message)
    msg += `- ${error.value.message}`

  return msg
})

// TODO: Report to Sentry
</script>

<template>
    <div class="">
        <div class="flex flex-column lg:flex-row gap-7 justify-content-center align-content-center align-items-center h-screen">
            <div class="text-center lg:text-right">
                <h1 class="text-7xl mt-0 pt-0">{{ heading }}</h1>
                <p class="text-700 text-3xl">
                  It looks like something broke. Sorry about that.
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
