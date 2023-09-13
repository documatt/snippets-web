<template>
  <div class="fullscreen">
    <div class="toolbar mb-3">

    </div>
    <div class="panes mb-3">
      <WriterPanes/>
    </div>
    <div class="footer">
      <LayoutFooter/>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Grid-based variant from https://codyloyd.com/2021/full-screen/ */
.fullscreen {
  /* Hack for iOS*/
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
}
.panes {
  flex-grow: 1;
  overflow: auto;
}
.toolbar {
  height: max-content;
  flex-shrink: 0;
}
.footer {
  height: max-content;
  flex-shrink: 0;
}
</style>
