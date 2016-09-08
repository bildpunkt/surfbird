<style>
</style>

<template>
  <div class="tweet-media-wrapper media-{{ media.length }}">
    <a v-for="image in media" v-bind:href="image.media_url_https" v-bind:data-lightbox="tweet.id_str + tweet.created_at" v-bind:title="tweet.text" class="media-image" v-bind:style="{ backgroundImage: 'url(' + image.media_url_https + ')' }"></a>
  </div>
</template>

<script>
export default {
  props: ['media', 'tweet']
}
</script>
