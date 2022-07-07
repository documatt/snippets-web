<template>
  <div>

    <EditorToolbar/>

    <div class="columns">
      <div class="column is-2"/>
      <div class="column is-8">
        <Editor/>
      </div>
      <div class="column is-2" />
    </div>

  </div>
</template>

<script>
import Editor from './Editor'
import EditorToolbar from '@/components/EditorToolbar'

export default {
  name: 'EditorTab',

  components: {
    EditorToolbar,
    Editor
  }
}
</script>
