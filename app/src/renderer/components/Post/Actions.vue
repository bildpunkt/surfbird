<template>
  <ul class="c-post__actions">
    <reply></reply>
    <retweet></retweet>
    <like></like>
    <more></more>
  </ul>
</template>

<script>
import Like from './Actions/Like'
import More from './Actions/More'
import Reply from './Actions/Reply'
import Retweet from './Actions/Retweet'

export default {
  components: {
    Like,
    More,
    Reply,
    Retweet
  },
  name: 'actions'
}
</script>

<style lang="scss">
.c-post {
  &__actions {
    width: 100%;
    float: left;
    list-style: none;
    padding: 0;
    margin: 0;
    user-select: none;
  }

  &__action {
    color: #c1ccd1;
    cursor: pointer;
    float: left;
    margin-right: 13px !important;
    padding: 0;
    margin: 0;
    font-family: Batch;
    font-size: 18px;
  }
}
</style>
