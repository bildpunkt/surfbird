<template>
  <div class="c-post__media" :data-media-count="media.length">
    <item v-for="(medium, index) in media" :medium="medium" :key="index"></item>
  </div>
</template>

<script>
import Item from './Media/Item'

export default {
  props: ['media'],
  components: {
    Item
  },
  inject: ['postData'],
  name: 'post-media'
}
</script>

<style lang="scss">
.c-post {
  &__media {
    position: relative;
    height: 120px;
    width: 100%;
    margin: 8px 0;
  }
}
</style>
