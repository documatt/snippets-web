<template>
  <nav class="navbar toolbar-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item"></div>
    </div>
    <!-- is-active = don't hide on smaller screens -->
    <div class="navbar-menu is-active">
      <div class="navbar-start">
        <slot name="start"></slot>
      </div>

      <div class="navbar-end">
        <slot name="end"></slot>
      </div>
    </div>
  </nav>
</template>

<script>
import { throttle } from 'lodash-es'

export default {
  name: 'Toolbar'
}

// class identifying toolbars
const toolbarClass = 'toolbar-navbar'

// class to assign if off the viewport
const offVpClass = 'toolbar-off-viewport'

// Scroll handler that finds all toolbars, and add/remove off the viewport
// CSS class if a user scrolled outside the viewport
window.addEventListener('scroll', throttle(() => {
      const $toolbars = Array.prototype.slice.call(document.querySelectorAll(`.${toolbarClass}`), 0)

      if ($toolbars.length === 0) {
        return
      }

      $toolbars.forEach(el => {
        const isClassApplied = el.classList.contains(offVpClass)
        const isToolbarParentInVp = el.parentElement.getBoundingClientRect().y >= 0

        if (!isClassApplied && !isToolbarParentInVp) {
          el.classList.add(offVpClass)
        }

        if (isClassApplied && isToolbarParentInVp) {
          el.classList.remove(offVpClass)
        }
      })
    }, 500)
)
</script>

<style lang="scss">
@import "./src/assets/styles/variables.scss";

.toolbar-navbar {
  //visibility: hidden;

  // Sticky
  top: 0;
  left: 0;
  right: 0;
  position: sticky !important;
  z-index: 30;

  .navbar-item {
    @include toolbar-font();

    .navbar-link,
    a.button {
      text-decoration: none !important;
      @include toolbar-font();
    }

    .dropdown {
      button {
        padding-left: 0.5em;
        padding-right: 0.5em;

        &.is-static {
          background-color: transparent;
        }
      }
      span.icon {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

  .navbar-brand {
    width: 16.6666666667%;    // 1/3
  }

  .navbar-end {
    padding-right: 0.75rem;
  }
}

.toolbar-off-viewport {
  box-shadow: 0 6px 3px -3px rgba(0, 0, 0, .1);
}
</style>
