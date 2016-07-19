<style>
</style>

<template>
  <div class="tweet" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.user.screen_name }}" v-if="content.retweeted_status === undefined">
    <div class="tweet-content">
      <div class="tweet-header">
        <img class="tweet-avatar" v-bind:src="content.user.profile_image_url"/>
        {{ content.user.name }} <small>{{ content.user.screen_name}}</small>
      </div>
      <tweet-body v-bind:tweet="content"></tweet-body>
      <tweet-footer :content="content"></tweet-footer>
    </div>
  </div>
  <div class="tweet" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.user.screen_name }}" v-else>
    <div class="tweet-content">
      <div class="tweet-context">{{ content.user.name }} retweeted</div>
      <div class="tweet-header">
        <img class="tweet-avatar" v-bind:src="content.retweeted_status.user.profile_image_url"/>
        {{ content.retweeted_status.user.name }} <small>{{ content.retweeted_status.user.screen_name}}</small>
      </div>
      <tweet-body v-bind:tweet="content.retweeted_status"></tweet-body>
      <tweet-footer :content="content"></tweet-footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'index']
}
</script>
