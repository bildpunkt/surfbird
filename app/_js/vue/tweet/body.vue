<style></style>

<template>
  <div class="tweet-body">
    <div class="tweet-text">{{{ tweet.text_html }}}</div>
    <div class="tweet-media-wrapper media-{{ tweet.extended_entities.media.length }}" v-if="tweet.extended_entities !== undefined">
      <a v-for="media in tweet.extended_entities.media" v-bind:href="media.media_url_https" v-bind:data-lightbox="tweet.id_str" v-bind:title="tweet.text" class="media-image" v-bind:style="{ backgroundImage: 'url(' + media.media_url_https + ')' }"></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tweet']
}
</script>
