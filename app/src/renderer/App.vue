<template>
  <div class="l-application">
    <window></window>
    <sidebar></sidebar>
    <app-content></app-content>
  </div>
</template>

<script>
  import Window from 'components/Window'
  import Sidebar from 'components/Sidebar'
  import AppContent from 'components/Content'
  import store from 'renderer/vuex/store'

  export default {
    components: {
      Window,
      Sidebar,
      AppContent
    },
    created: function () {
      this.$store.dispatch('addProfile', 'test')
      this.$store.dispatch('addAccount', {user: {display_name: 'Test', screenname: 'username'}, tokens: {}})
    },
    store
  }
</script>

<style>
body, input, textarea, keygen, select, button {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.l-application {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
</style>
