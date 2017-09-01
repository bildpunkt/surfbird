<template>
  <div class="c-sidebar__profile" :class="{ 'c-sidebar__profile--active': active }" @click="setActive(index)">
    {{ initial }}
  </div>
</template>

<script>
export default {
  props: ['data', 'index'],
  computed: {
    active: function () {
      if (this.index === this.$store.state.profiles.activeProfile) {
        return true
      }

      return false
    },
    initial: function () {
      return this.data.name.charAt(0).toUpperCase()
    }
  },
  methods: {
    setActive: function (index) {
      this.$store.dispatch('setActiveProfile', index)
    }
  }
}
</script>

<style lang="scss">
.c-sidebar__profile {
  position: relative;
  padding: 0 10px;
  margin-top: 10px;
  font-size: 24px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  color: #fff;

  &--active {
    color: red;
  }
}
</style>
