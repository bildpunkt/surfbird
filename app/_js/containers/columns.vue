<style>
</style>

<template>
  <div class="l-columns">
    <column v-for="(c, index) in columns" :data="c" :index="index"></column>
  </div>
</template>

<script>
export default {
  computed: {
    columns: function() {
      return this.$store.state.profiles.all[this.$store.state.profiles.activeProfile].columns
    }
  }
}
</script>
