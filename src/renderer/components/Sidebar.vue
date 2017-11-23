<template>
  <div class="l-sidebar">
    <profile v-for="(p, index) in profiles" :data="p" :index="index" :key="index"></profile>
    <action icon="" :func="addProfile"></action>
    <action icon="" :func="addColumn"></action>
  </div>
</template>

<script>
import Action from './Sidebar/Action'
import Profile from './Sidebar/Profile'

import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    profiles: 'allProfiles'
  }),
  methods: {
    addColumn (e) {
      // this.$store.dispatch('addColumn', {name: 'Test Column', type: 'Home', owner: this.$store.state.accounts.activeAccount})
      this.$modal.show('column-modal')
    },
    addProfile (e) {
      this.$store.dispatch('addProfile', 'Test')
    }
  },
  components: {
    Action,
    Profile
  },
  name: 'sidebar'
}
</script>

<style>
.l-sidebar {
  background-color: #202020;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 50px;
  z-index: 200;
}
</style>
