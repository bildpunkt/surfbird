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
      return this.$store.state.columns[this.$parent.index].tweets
    }
  }
}
</script>
