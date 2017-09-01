<template>
  <modal name="authentication-modal" @before-close="beforeClose">
    <div v-if="loading">
      <div class="loader-inner ball-scale">
        <div></div>
      </div>

      <p>Waiting for authentication to be finished...</p>
    </div>
    <div v-else>
      <p>This is the modal that is shown when no accounts were added, basically your first start.</p> 

      <p v-for="(s, index) in services"><a href="#" @click="authenticate(s.identifier)">Authenticate with {{s.name}}</a></p>
    </div>
  </modal>  
</template>

<script>
export default {
  name: 'authentication-modal',
  data: function () {
    return {
      loading: false,
      services: []
    }
  },
  methods: {
    authenticate: function (identifier) {
      this.$electron.ipcRenderer.send('surfbird:authentication:start', {service: identifier})
      this.loading = true
    },
    beforeClose: function (e) {
      if (this.$store.state.accounts.all.length < 1) {
        e.stop()
      }
    }
  },
  created: function () {
    this.$electron.ipcRenderer.send('surfbird:request:services')

    this.$electron.ipcRenderer.on('surfbird:get:services', (e, data) => {
      this.services = data
    })
  }
}
</script>

<style lang="scss">
.ball-scale > div {
  background-color: #2196F3;
}
</style>
