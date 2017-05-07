<template>
<div class="c-quoted-tweet">
  <tweet-header avatar="false"></tweet-header>
  <div class="c-tweet__body">
    <p class="c-tweet__text" v-html="data.text_html"></p>
    <tweet-media v-if="data.extended_entities !== undefined"></tweet-media>
  </div>
</div>  
</template>

<script>
import TweetHeader from './Header'
import TweetMedia from './Media'

export default {
  props: ['data'],
  components: {
    TweetHeader,
    TweetMedia
  },
  name: 'quoted-tweet'
}
</script>

<style lang="scss">
.c-quoted-tweet {
  border: 1px solid #E1E8ED;
  color: #66757f;
  font-size: 0.9em;
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 10px;
}
</style>
