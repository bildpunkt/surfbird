<style></style>

<template>
  <div class="tweet-body">
    <div class="tweet-text">{{{ tweet.text_html }}}</div>
    <tweet-media :media="tweet.extended_entities.media" :tweet="tweet" v-if="tweet.extended_entities !== undefined"></tweet-media>
  </div>
</template>

<script>
export default {
  props: ['tweet']
}
</script>
