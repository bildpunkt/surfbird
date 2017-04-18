<template>
  <div class="l-window__drag-area"></div>
</template>

<script>
export default {
}
</script>

<style>
.l-window__drag-area {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  width: 100%;
  -webkit-app-region: drag;
}
</style>
