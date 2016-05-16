<style></style>

<template>
  <div class="tweet-body">
    <div class="tweet-text">{{ tweet.text }}</div>
    <div class="tweet-media-wrapper media-{{ tweet.extended_entities.media.length }}" v-if="tweet.extended_entities !== undefined">
      <div v-for="media in tweet.extended_entities.media" class="media-image" v-bind:style="{ backgroundImage: 'url(' + media.media_url_https + ')' }"></div>
    </div>
    <button class="reply">Reply</button>
    <button class="retweet">Retweet</button>
    <button class="favorite">Favorite</button>
  </div>
</template>

<script>
export default {
  props: ['tweet']
}
</script>
