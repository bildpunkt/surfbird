<template>
<div class="c-quoted-post">
  <post-header avatar="false"></post-header>
  <div class="c-post__body">
    <p class="c-post__text" v-html="data.text_html"></p>
    <post-media v-if="data.extended_entities !== undefined"></post-media>
  </div>
</div>  
</template>

<script>
import PostHeader from './Header'
import PostMedia from './Media'

export default {
  props: ['data'],
  components: {
    PostHeader,
    PostMedia
  },
  name: 'quoted-post'
}
</script>

<style lang="scss">
.c-quoted-post {
  border: 1px solid #E1E8ED;
  color: #66757f;
  font-size: 0.9em;
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 10px;
}
</style>
