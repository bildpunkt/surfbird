<style>
</style>

<template>
  <div class="c-column__content">
    <div class="c-column__scroller">
      <tweet v-for="tweet in tweets"></tweet>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tweets: function() {
      return this.$store.state.profiles.all[this.$store.state.profiles.activeProfile].columns[this.$parent.index].tweetStorage.ids
    }
  }
}
</script>
