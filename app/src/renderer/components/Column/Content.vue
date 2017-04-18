<template>
  <div class="c-column__content">
    <div class="c-column__scroller">
      <tweet v-for="tweet in tweets"></tweet>
    </div>
  </div>
</template>

<script>
import Tweet from '../Tweet'

export default {
  computed: {
    tweets: function () {
      return this.$store.state.profiles.all[this.$store.state.profiles.activeProfile].columns[this.$parent.index].tweetStorage.ids
    }
  },
  components: {
    Tweet
  },
  name: 'content'
}
</script>

<style lang="scss">
.c-column {
  &__content {
    display: flex;
    position: relative;
    height: 100%;
    flex: 1 1 auto;
    min-width: 1px;
    min-height: 1px;
    -webkit-box-flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }

  &__scroller {
    position: relative;
    height: 100%;
    flex: 1 1 auto;
    min-width: 1px;
    min-height: 1px;
    overflow-x: hidden;
    word-break: break-word;
    word-wrap: break-word;
    overflow-y: auto;
  }
}
</style>
