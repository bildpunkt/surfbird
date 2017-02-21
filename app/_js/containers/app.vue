<style>
</style>

<template>
  <div class="l-application">
    <window></window>
    <sidebar></sidebar>
    <app-content></app-content>
  </div>
</template>

<script>
export default {
  created: function() {
    this.$store.dispatch('addProfile', 'test')
    this.$store.dispatch('addAccount', {user: {display_name: "Test", screenname: "username"}, tokens: {}})
  }
}
</script>
