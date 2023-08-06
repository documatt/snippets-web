<template>
  <div>
    <b-message v-if="isError" type="is-danger">
      Document can't be saved due to error. Please copy &amp; paste the text as backup before reloading or closing browser.
    </b-message>

    <CodeMirror @change="setDirty" @changes="save" @blur="save" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import log from 'loglevel'
import CodeMirror from './CodeMirror'

export default {
  name: 'Editor',

  components: { CodeMirror },

  data: () => ({
    // flag to highlight editor border in red on error
    isError: false
  }),

  computed: {
    ...mapState('document', ['currentBody', 'currentId'])
  },

  methods: {
    setDirty() {
      this.$store.commit('document/setIsDirty', true)
    },

    async save (body) {
      try {
        await this.$store.dispatch('document/saveAndSetBody', { body }, { root: true })
        this.isError = false

      } catch (e) {
        // say it to console, and user
        log.warn(`Failed to save body due to '${e}'`)
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Save failed. See console for details.',
          duration: 10 * 1000 // 10 seconds
        })
        this.isError = true

      }
    }
  }
}
</script>
