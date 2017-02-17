<style>
</style>

<template>
  <div class="c-sidebar__profile" :class="{ 'c-sidebar__profile--active': active }" @click="setActive(index)">
    {{ initial }}
  </div>
</template>

<script>
export default {
  props: ['data', 'index'],
  computed: {
    active: function() {
      if (this.index === this.$store.state.profiles.activeProfile) {
        return true
      }

      return false
    },
    initial: function() {
      return this.data.name.charAt(0).toUpperCase()
    }
  },
  methods: {
    setActive: function(index) {
      this.$store.dispatch('setActiveProfile', index)
    }
  }
}
</script>
