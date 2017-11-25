<template>
  <div class="l-application">
    <window></window>
    <sidebar></sidebar>
    <app-content></app-content>
    <modals></modals>
  </div>
</template>

<script>
  import Window from './components/Window'
  import Sidebar from './components/Sidebar'
  import AppContent from './components/Content'
  import Modals from './components/Modals'

  import store from './vuex/store'
  import i18n from './i18n'

  export default {
    components: {
      Window,
      Sidebar,
      AppContent,
      Modals
    },
    created: function () {
      this.$electron.ipcRenderer.send('surfbird:request:accounts')

      this.$electron.ipcRenderer.on('surfbird:get:accounts', (e, data) => {
        if (data.length > 0) {
          data.forEach((account) => {
            this.$store.dispatch('addAccount', account)
          })
        } else {
          this.$modal.show('authentication-modal')
        }
      })

      this.$electron.ipcRenderer.on('surfbird:authentication:done', (e, account) => {
        this.$store.dispatch('addAccount', account)
        this.$modal.hide('authentication-modal')
      })

      this.$store.dispatch('addProfile', 'test')
    },
    store,
    i18n
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

.emoji {
  width: 1em;
  height: 1em;
  padding: 0 .05em 0 .1em;
  vertical-align: -0.1em;
}

a {
  color: #2196F3;
  text-decoration: none;
}
</style>
