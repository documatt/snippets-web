<template>
  <div>
    <b-loading :active="isLoading" :is-full-page="false" />

    <b-message v-if="showSampleDocumentTip" type="is-info" has-icon>
      Wanna start with <a @click.prevent="loadSampleDocument">sample reStructuredText document</a>?
    </b-message>

    <div ref="codemirror" />
  </div>
</template>

<script>
/**
 * CodeMirror 5 on-page editor.
 *
 * Initially displays store's document.currentBody as text in reStructuredText syntax highlight mode. Component intentionally doesn't modify store (doesn't provide two-way binding similar to v-model). It only notifies its parent via events about the modifications. Parent decide whether to update the store/whatever, to drop the change, etc.
 *
 * Fired events are:
 *
 * - 'changes' - minor changes. To have an idea: if user continuously types, it fires the event every 2-3 seconds. Send changed text as an argument.
 * - 'change' - on every keystore
 * - 'blur' - user leaves the editor and changes the text. Send changed text as an argument.
 *
 * If editor is empty, it offers a user to load a sample document.
 */
import { debounce } from 'lodash-es'
import { mapState } from 'vuex'
import log from 'loglevel'
// load the file as string using Webpack raw-loader
import sampleDocument from '@/sample-document.rst'
import { EV_EDITOR_INSERT, EV_EDITOR_UNDO } from '@/consts'

// require() because CodeMirror 5 isn't ES6 module
const CodeMirror = require('codemirror/lib/codemirror')
// and RST mode
require('codemirror/mode/rst/rst')

require('codemirror/addon/display/placeholder')


export default {
  name: 'CodeMirror',

  inject: ['eventBus'],

  data: () => ({
    showSampleDocumentTip: false,
    isLoading: true,
    previousValue: ''
  }),

  computed: {
    ...mapState('document', ['currentBody'])
  },

  created () {
    this.eventBus.$on(EV_EDITOR_UNDO, this.undo)
    this.eventBus.$on(EV_EDITOR_INSERT, this.insert)
  },

  mounted () {
    this.initCodeMirror()

    this.isLoading = false

    this.previousValue = this.currentBody

    // Listen for store's body change, update the editor. Returned function must be called in destroyed().
    this.unsubscribeFn = this.$store.subscribe((mutation) => {
      if (mutation.type === 'document/setCurrentBody') {
        const newBody = mutation.payload
        if (newBody !== this.previousValue) {
          log.trace('Body changed in Vuex, updating CodeMirror')
          this.previousValue = newBody
          this.codemirror.setValue(mutation.payload)
        }
      }
    })
  },

  destroyed () {
    this.unsubscribeFn()
  },

  methods: {
    initCodeMirror () {
      this.showSampleDocumentTip = this.currentBody === ''

      this.codemirror = CodeMirror(this.$refs.codemirror, {
        lineNumbers: true,
        mode: 'rst',
        value: this.currentBody,
        autofocus: true,
        lineWrapping: true,
        theme: 'deo',
        placeholder: 'Every journey begins with a first step.'
      })

      // On typing, fires "changes" event. Despite CodeMirror "changes" event is batched, it still
      // fired too often (after every keystore in practice). We need to debounce it fire event only
      // every N second in max
      this.codemirror.on('changes', debounce((instance) => {
        const newValue = instance.getValue()

        this.showSampleDocumentTip = newValue === ''

        if (newValue !== this.previousValue) {
          log.trace('Firing "changes" event')
          this.$emit('changes', newValue)
          this.previousValue = newValue
        }
      }, 2000))

      this.codemirror.on('change', () => {
        log.trace('Firing "change" event')
        this.$emit('change')
      })

      // On blur (leaving editor)
      this.codemirror.on('blur', (instance) => {
        const newValue = instance.getValue()

        this.showSampleDocumentTip = newValue === ''

        if (newValue !== this.previousValue) {
          log.trace('Firing "blur" event')
          this.$emit('blur', newValue)
          this.previousValue = newValue
        }
      })
    },

    loadSampleDocument () {
      log.trace('Setting sample document')
      this.codemirror.setValue(sampleDocument)

      if (sampleDocument !== this.previousValue) {
        log.trace('Firing changes event')
        this.$emit('changes', sampleDocument)
        this.previousValue = sampleDocument
      }
    },

    undo () {
      this.codemirror.getDoc().undo()
    },

    insert (text) {
      const cur = this.codemirror.getDoc().getCursor()
      this.codemirror.getDoc().replaceRange(text, cur)
      // focus again because replace lost it
      this.codemirror.focus()
    }
  }
}
</script>

<style lang="scss">
@import '~codemirror/lib/codemirror.css';
@import '../assets/styles/codemirror-deo.scss';

// from https://codemirror.net/demo/resize.html
.CodeMirror {
  border: none;
  height: auto;
}
</style>
