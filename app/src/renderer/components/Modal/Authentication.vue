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

      <p><a href="#" @click="authenticate">Authenticate with Twitter</a></p>
    </div>
  </modal>  
</template>

<script>
export default {
  name: 'authentication-modal',
  data: function () {
    return {
      loading: false
    }
  },
  methods: {
    authenticate: function (e) {
      e.preventDefault()

      this.$electron.ipcRenderer.send('surfbird:authentication:start', {service: 'twitter'})
      this.loading = true
    },
    beforeClose: function (e) {
      if (this.$store.state.accounts.all.length < 1) {
        e.stop()
      }
    }
  }
}
</script>

<style lang="scss">
.ball-scale > div {
  background-color: #2196F3;
}
</style>
