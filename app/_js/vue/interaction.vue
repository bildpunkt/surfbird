<style>
</style>

<template>
  <div class="tweet" data-created-at="{{ content.created_at }}" data-username="{{ content.source.screen_name }}">
    <div class="tweet-content">
      <div class="tweet-header">
        <img class="tweet-avatar small" v-bind:src="content.source.profile_image_url"/>
        {{ content.source.name }}
        <span v-if="event == 'favorite'">favorited your tweet</span>
        <span v-if="event == 'unfavorite'">unfavorited your tweet</span>
        <span v-if="event == 'follow'">followed you</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'index', 'event']
}
</script>