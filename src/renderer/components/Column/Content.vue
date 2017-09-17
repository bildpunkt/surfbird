<template>
  <div class="c-column__content">
    <div class="c-column__scroller">
      <post v-for="post in posts" :id="post" :colindex="columnIndex"></post>
    </div>
  </div>
</template>

<script>
import Post from '../Post'

export default {
  inject: ['columnIndex', 'columnProfile'],
  computed: {
    posts: function () {
      return this.$store.state.profiles.all[this.columnProfile].columns[this.columnIndex].postStorage.ids
    }
  },
  components: {
    Post
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
