<style>
</style>

<template>
  <div class="tweet" data-created-at="{{ content.created_at }}" data-username="{{ content.source.screen_name }}" v-if="event !== 'mention'">
    <div class="tweet-content">
      <div class="tweet-header">
        <img class="tweet-avatar small" v-bind:src="content.source.profile_image_url"/>
        {{ content.source.name }}
        <span v-if="event == 'favorite'">favorited your tweet</span>
        <span v-if="event == 'unfavorite'">unfavorited your tweet</span>
        <span v-if="event == 'follow'">followed you</span>
      </div>
      <div class="tweet-body contextual" v-if="content.target_object !== undefined">
        <div class="tweet-header">
          {{ content.target_object.user.name }} 
          <small>
            {{ content.target_object.user.screen_name }}
          </small>  
        </div>  
        <div class="tweet-text">{{ content.target_object.text }}</div>
        <div class="tweet-media-wrapper media-{{ content.target_object.extended_entities.media.length }}" v-if="content.target_object.extended_entities !== undefined">
          <div v-for="media in content.target_object.extended_entities.media" class="media-image" v-bind:style="{ backgroundImage: 'url(' + media.media_url_https + ')' }"></div>
        </div>
      </div>  
    </div>
  </div>
  <stream-item v-bind:content="content" v-bind:index="$index" v-else></stream-item>
</template>

<script>
export default {
  props: ['content', 'index', 'event']
}
</script>