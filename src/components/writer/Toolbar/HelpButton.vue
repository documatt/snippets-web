<template>
  <Button icon="pi pi-question-circle" label="Syntax" outlined @click="onClick" />
</template>

<script setup lang="ts">
import Button from 'primevue/button'

function onClick() {
  window.open('https://documatt.com/restructuredtext-reference/', '_blank')
}
</script>

<style scoped lang="scss"></style>
