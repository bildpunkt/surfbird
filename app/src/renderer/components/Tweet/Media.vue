<template>
  <div class="c-tweet__media" :data-media-count="media.length">
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
      return this.$parent.data.extended_entities.media
    }
  },
  name: 'tweet-media'
}
</script>

<style lang="scss">
.c-tweet {
  &__media {
    position: relative;
    height: 120px;
    width: 100%;
    margin: 8px 0px;
  }
}
</style>
