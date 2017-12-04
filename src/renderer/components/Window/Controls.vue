<template>
  <ul class="l-window__controls">
    <close :func="close"></close>
    <maximize :func="maximize"></maximize>
    <minimize :func="minimize"></minimize>
  </ul>
</template>

<script>
import Close from './Controls/Close'
import Maximize from './Controls/Maximize'
import Minimize from './Controls/Minimize'

export default {
  components: {
    Close,
    Maximize,
    Minimize
  },
  methods: {
    close (e) {
      this.$electron.ipcRenderer.send('surfbird:window:close', true)
    },
    maximize (e) {
      this.$electron.ipcRenderer.send('surfbird:window:maximize', true)
    },
    minimize (e) {
      this.$electron.ipcRenderer.send('surfbird:window:minimize', true)
    }
  },
  name: 'controls'
}
</script>

<style lang="scss">
.l-window {
  &__controls {
    position: fixed;
    top: 0px;
    right: 0px;
    float: right;
    list-style: none;
    padding: 17px;
    padding-left: 25px;
    margin: 0;
    user-select: none;
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 100%);
    z-index: 999;
  }

  &__control {
    color: #b0bec5;
    cursor: pointer;
    float: right;
    margin-right: 13px !important;
    padding: 0;
    margin: 0;
    font-size: 18px;

    &:first-child {
      margin-right: 0px !important;
    }
  }
}
</style>
