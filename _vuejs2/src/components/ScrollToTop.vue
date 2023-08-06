<template>
  <div class="scroll-to-top" title="Scroll to top">
    <b-button icon-right="chevron-up" @click="scrollToTop" />
  </div>
</template>

<script>
import { throttle } from 'lodash-es'

export default {
  name: 'ScrollToTop',

  methods: {
    scrollToTop() {
      document.body.scrollTop = 0             // Safari
      document.documentElement.scrollTop = 0  // others
    }
  }
}

window.addEventListener('scroll', throttle(() => {
      const scrollEl = document.querySelector('.scroll-to-top')

      if (!scrollEl) {
        return
      }

      if ((document.body.scrollTop > 20) ||             // Safari
          (document.documentElement.scrollTop > 20)) {  // others
        scrollEl.style.display = 'block'
      } else {
        scrollEl.style.display = 'none'
      }
    }, 500)
)
</script>

<style scoped lang="scss">
.scroll-to-top {
  // initially hidden
  display: none;

  // right bottom corner
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 99;
}
</style>
