<style>
</style>

<template>
  <div class="tweet" data-created-at="{{ content.created_at }}" data-username="{{ content.source.screen_name }}" v-if="event !== 'mention'">
    <div class="tweet-content">
      <div class="tweet-header">
        <img class="tweet-avatar small" :src="content.source.profile_image_url"/>
        {{ $t('interaction.event.' + event, {user: content.source.name}) }}
      </div>
      <div class="tweet-body contextual" v-if="content.target_object !== undefined">
        <div class="tweet-header">
          {{ content.target_object.user.name }} 
          <small>
            {{ content.target_object.user.screen_name }}
          </small>  
        </div>  
        <div class="tweet-text">{{{ content.target_object.text_html }}}</div>
        <tweet-media :media="content.target_object.extended_entities.media" :tweet="content.target_object" v-if="content.target_object.extended_entities !== undefined"></tweet-media>
      </div>  
    </div>
  </div>
  <stream-item :id="content.id_str" :index="$index" v-else></stream-item>
</template>

<script>
export default {
  props: ['content', 'index', 'event']
}
</script>
