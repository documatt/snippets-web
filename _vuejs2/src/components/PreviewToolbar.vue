<template>
  <Toolbar>
    <template slot="start"/>
    <template slot="end">
      <div class="navbar-item">
        <b-button
            @click="refresh"
            type="is-light"
            icon-left="refresh"
            :disabled="isBodyEmpty">
          <!--  Button text -->
          <template v-if="!previewInProgress">
            Force refresh
          </template>
          <template v-else>
            Refreshing...
          </template>
        </b-button>
      </div>
    </template>
  </Toolbar>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PreviewToolbar',

  components: { Toolbar },

  computed: {
    ...mapState('document', [
      'previewInProgress'
    ]),
    ...mapGetters('document', ['isBodyEmpty'])
  },

  methods: {
    async refresh () {
      await this.$store.dispatch('document/getAndSetPreview', null, { root: true })
    }
  }
}
</script>

<style scoped>

</style>
