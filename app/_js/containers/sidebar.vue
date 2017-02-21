<style>
</style>

<template>
  <div class="l-sidebar">
    <sidebar-profile v-for="(p, index) in profiles" :data="p" :index="index"></sidebar-profile>
    <sidebar-button icon="" :func="addProfile"></sidebar-button>
    <sidebar-button icon="" :func="addColumn"></sidebar-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    profiles: 'allProfiles'
  }),
  methods: {
    addColumn(e) {
      this.$store.dispatch('addColumn', {name: "Test Column", type: "Home", owner: this.$store.state.accounts.activeAccount})
    },
    addProfile(e) {
      this.$store.dispatch('addProfile', 'Test')
    }
  }
}
</script>
