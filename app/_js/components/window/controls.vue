<style>
</style>

<template>
  <ul class="l-window__controls">
    <window-control-close :func="close"></window-control-close>
    <window-control-maximize :func="maximize"></window-control-maximize>
    <window-control-minimize :func="minimize"></window-control-minimize>
  </ul>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer

export default {
  methods: {
    close (e) {
      ipcRenderer.send('surfbird:window:close', true)
    },
    maximize (e) {
      ipcRenderer.send('surfbird:window:maximize', true)
    },
    minimize (e) {
      ipcRenderer.send('surfbird:window:minimize', true)
    }
  }
}
</script>
