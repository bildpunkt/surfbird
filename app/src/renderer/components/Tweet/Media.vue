<template>
  <div class="c-tweet__media" data-media-count="1">
    <item></item>
  </div>
</template>

<script>
import Item from './Media/Item'

export default {
  components: {
    Item
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
