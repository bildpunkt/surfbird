<template>
  <div class="c-post__media" :data-media-count="media.length">
    <item v-for="medium in media" :medium="medium"></item>
  </div>
</template>

<script>
import Item from './Media/Item'

export default {
  components: {
    Item
  },
  computed: {
    media: function () {
      if (this.$parent.data.retweeted_status !== undefined) {
        return this.$parent.data.retweeted_status.extended_entities.media
      } else {
        return this.$parent.data.extended_entities.media
      }
    }
  },
  name: 'post-media'
}
</script>

<style lang="scss">
.c-post {
  &__media {
    position: relative;
    height: 120px;
    width: 100%;
    margin: 8px 0px;
  }
}
</style>
