<template>
  <Toolbar>
    <template slot="start">

      <!--
      Formatting icons bold, italic, ...
      -->
      <div class="navbar-item">
        <b-field>
          <p class="control">
            <b-dropdown :triggers="['hover']" aria-role="list">
              <button class="button is-static" slot="trigger">
                <b-icon icon="format-header-1"></b-icon>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="listitem" @click="h1">
                <b-tooltip multilined label="Suggested for document title">
                  Heading level 1
                </b-tooltip>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="h2">
                Heading level 2
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="h3">
                Heading level 3
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="h4">
                Heading level 4
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="h5">
                Heading level 5
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="h6">
                Heading level 6
              </b-dropdown-item>
            </b-dropdown>
          </p>
          <p class="control">
            <button class="button" @click="bold">
              <b-icon icon="format-bold"></b-icon>
            </button>
          </p>
          <p class="control">
            <button class="button" @click="italic">
              <b-icon icon="format-italic"></b-icon>
            </button>
          </p>
        </b-field>
      </div>

      <div class="navbar-item">
        <b-field>
          <p class="control">
            <b-dropdown :triggers="['hover']" aria-role="list">
              <button class="button is-static" slot="trigger">
                <b-icon icon="link"></b-icon>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="listitem" @click="externalLink">
                External link
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="externalLinkWithTitle">
                External link with title
              </b-dropdown-item>
            </b-dropdown>
          </p>
          <p class="control">
            <b-dropdown :triggers="['hover']" aria-role="list">
              <button class="button is-static" slot="trigger">
                <b-icon icon="image-outline"></b-icon>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="listitem" @click="blockImage">
                <b-tooltip label="Regular image">
                  Block image
                </b-tooltip>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="inlineImage">
                <b-tooltip label="Image lying inside the line">
                  Inline image
                </b-tooltip>
              </b-dropdown-item>
            </b-dropdown>
          </p>
          <p class="control">
            <b-dropdown :triggers="['hover']" aria-role="list">
              <button class="button is-static" slot="trigger">
                <b-icon icon="code-tags"></b-icon>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="listitem" @click="literalBlock">
                <b-tooltip label="Regular image">
                  Plain code block
                </b-tooltip>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="codeBlock">
                <b-tooltip label="Image lying inside the line">
                  Code block with syntax highlighting
                </b-tooltip>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="inlineCode">
                <b-tooltip label="Image lying inside the line">
                  Inline code
                </b-tooltip>
              </b-dropdown-item>
            </b-dropdown>
          </p>
          <p class="control">
            <b-tooltip label="Bulleted (unordered) list" position="is-bottom">
              <button class="button" @click="unorderedList">
                <b-icon icon="format-list-bulleted"></b-icon>
              </button>
            </b-tooltip>
          </p>
          <p class="control">
            <b-tooltip label="Numbered (ordered) list" position="is-bottom">
              <button class="button" @click="orderedList">
                <b-icon icon="format-list-numbered"></b-icon>
              </button>
            </b-tooltip>
          </p>
        </b-field>
      </div>

      <div class="navbar-item">
        <b-field>
          <p class="control">
            <b-tooltip label="Undo last change" position="is-bottom">
              <button class="button" @click="undo">
                <b-icon icon="undo"></b-icon>
              </button>
            </b-tooltip>
          </p>
        </b-field>
      </div>

      <div class="navbar-item">
        <b-field>
          <p class="control">
            <a class="button" href="https://restructuredtext.documatt.com/" target="_blank">
              <b-icon icon="help-circle-outline"></b-icon>
              <span>Syntax</span>
            </a>
          </p>
        </b-field>
      </div>
    </template>
    <template slot="end">
      <div class="navbar-item">
        <div class="buttons">
          <b-button type="is-primary" @click="clear">New</b-button>
          <!--  <b-button type="is-primary">Publish</b-button> -->
        </div>
      </div>
      <div class="navbar-item is-paddingless">
        <SaveStatus/>
      </div>
    </template>
  </Toolbar>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import SaveStatus from '@/components/SaveStatus'
import { EV_EDITOR_INSERT, EV_EDITOR_UNDO } from '@/consts'

export default {
  name: 'EditorToolbar',

  components: { Toolbar, SaveStatus },

  inject: ['eventBus'],

  methods: {
    clear () {
      this.$buefy.dialog.confirm({
        message: 'Discard existing document and start with the new one?',
        onConfirm: () => {
          this.$store.dispatch('document/saveAndSetBody', { body: '' })
        }
      })
    },

    h1 () {
      const text =
          '\n' +
          '###############\n' +
          'Section level 1\n' +
          '###############\n' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    h2 () {
      const text =
          '\n' +
          '***************\n' +
          'Section level 2\n' +
          '***************\n' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    h3 () {
      const text =
          '\n' +
          'Section level 3\n' +
          '===============\n' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    h4 () {
      const text =
          '\n' +
          'Section level 4\n' +
          '---------------\n' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    h5 () {
      const text =
          '\n' +
          'Section level 5\n' +
          '^^^^^^^^^^^^^^^\n' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    h6 () {
      const text =
          '\n' +
          'Section level 6\n' +
          "'''''''''''''''\n" +
          "\n"
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    bold () {
      const text =
          '\n' +
          'two asterisk **do bold** text' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    italic () {
      const text =
          '\n' +
          'one asterisk *italic* text' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    externalLink () {
      const text =
          '\n' +
          'Learn syntax at https://techwriter.documatt.com/restructuredtext-sphinx/index.html.' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    externalLinkWithTitle () {
      const text = '' +
          '\n' +
          'See `syntax reference <https://techwriter.documatt.com/restructuredtext-sphinx/index.html>`_.' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    blockImage () {
      const text =
          '\n' +
          '.. image:: https://techwriter.documatt.com/_static/open-doodles-clumsy.svg' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    inlineImage () {
      const text =
          '\n' +
          'Inline images like |favicon| can be defined with image directive in a substitution definition.\n' +
          '\n' +
          '.. |favicon| image:: https://techwriter.documatt.com/_static/img/favicon.ico\n' +
          '   :width: 1em\n' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    literalBlock () {
      const text =
          '\n' +
          'In almost any documentation you need to show examples like:\n' +
          '\n' +
          '::\n' +
          '\n' +
          '    def add(one, two):\n' +
          '        return one + two' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    codeBlock () {
      const text =
          '\n' +
          '.. code-block:: javascript\n' +
          '\n' +
          '   for (let i = 0; i < 3; i++) {        // shows 0, then 1, then 2\n' +
          '       alert(i);\n' +
          '   }' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    inlineCode () {
      const text =
          '\n' +
          'Inline code required ``wrap text`` with two backticks.' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    unorderedList () {
      const text =
          '\n' +
          'Unordered lists usually use ``*`` as bullet symbol:\n' +
          '\n' +
          '* A bullet list item\n' +
          '* Second item\n' +
          '* A sub item' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    orderedList () {
      const text =
          '\n' +
          'Ordered (enumerated) lists that is auto-numbered starts with ``#.``:\n' +
          '\n' +
          '#. one\n' +
          '#. two\n' +
          '#. three' +
          '\n'
      this.eventBus.$emit(EV_EDITOR_INSERT, text)
    },

    undo () {
      this.eventBus.$emit(EV_EDITOR_UNDO)
    },
  }

}
</script>

<style scoped>

</style>
