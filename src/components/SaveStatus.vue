<template>
  <div :class="{'is-invisible': hide}">
    <template v-if="isDirty">
      <b-icon icon="progress-upload" title="Saving your changes"/>
    </template>
    <template v-else-if="!isSaving">
      <b-tooltip label="All changes automatically saved" position="is-left">
        <b-icon icon="cloud-check-outline"/>
      </b-tooltip>
    </template>
  </div>
</template>

<script>
/**
 * Component initially hides its template, because it's weird if page
 * immediately displays 'Saved'.
 */

import { mapState } from 'vuex'
import { sleep } from '@/utils'

export default {
  name: 'SaveStatus',

  data: () => ({
    hide: true
  }),

  computed: mapState('document', [
    'isDirty', 'isSaving'
  ]),

  async mounted () {
    await sleep(1000)
    this.hide = false
  }
}
</script>

<style scoped>

</style>
