<template>
  <modal name="authentication-modal" @before-close="beforeClose">
    <div v-if="loading">
      <div class="loader-inner ball-scale">
        <div></div>
      </div>

      <p>{{ $t('message.authentication_waiting') }}</p>
    </div>
    <div v-else>
      <p>{{ $t('message.authentication_start') }}</p>

      <p v-for="(s, index) in services"><a href="#" @click="authenticate(s.identifier)">{{ $t('message.authentication_with', [s.name]) }}</a></p>
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
