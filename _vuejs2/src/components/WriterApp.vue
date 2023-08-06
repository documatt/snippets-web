<template>
  <div>
    <section class="section is-top-paddingless is-bottom-paddingless">
      <div class="container">
        <b-tabs type="is-boxed" position="is-centered" @input="onTabChanged">
          <b-tab-item label="Write" icon="playlist-edit" value="editor">
            <EditTab/>
          </b-tab-item>
          <b-tab-item label="Preview" icon="clipboard-text-play-outline" value="preview">
            <PreviewTab/>
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
    <ScrollToTop />
  </div>
</template>

<script>
import EditTab from './EditTab'
import PreviewTab from './PreviewTab'
import ScrollToTop from '@/components/ScrollToTop'

export default {
  name: 'WriterApp',

  components: {
    ScrollToTop,
    EditTab,
    PreviewTab
  },

  methods: {
    async onTabChanged (value) {
      if (value === 'editor') {
        // nothing
      } else if (value === 'preview') {
        await this.$store.dispatch('document/tryPreview', null, { root: true })
      }
    }
  }
}
</script>

<style>
section.tab-content {
  padding: 0 !important;
}
</style>
