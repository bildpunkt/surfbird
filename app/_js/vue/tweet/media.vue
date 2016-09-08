<style>
</style>

<template>
  <div class="tweet-media-wrapper media-{{ media.length }}">
    <a v-for="image in media" :href="image.media_url_https" :data-lightbox="tweet.id_str + tweet.created_at" :title="tweet.text" class="media-image" :style="{ backgroundImage: 'url(' + image.media_url_https + ')' }"></a>
  </div>
</template>

<script>
export default {
  props: ['media', 'tweet']
}
</script>
