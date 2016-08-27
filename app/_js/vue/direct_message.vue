<style>
</style>

<template>
  <div class="tweet" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.sender.screen_name }}" v-if="content.retweeted_status === undefined">
    <div class="tweet-content">
      <div class="tweet-header">
        <img class="tweet-avatar" v-bind:src="content.sender.profile_image_url"/>
        {{ content.sender.name }} <small>{{ content.sender.screen_name}}</small>
      </div>
      <div class="tweet-body">
        <div class="tweet-text">{{{ content.text_html }}}</div>
      </div>
      <div class="tweet-footer clearfix">
        <ul class="tweet-actions">
          <li class="action-item">
              <a href="#" class="reply" @click="reply">
                  <i class="fa fa-reply"></i>
              </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'index'],
  methods: {
    reply (e) {
      $('.js-compose-recipient').val(this.content.sender.screen_name)
      $('[href="#composeDirectMessage"]').tab('show')

      $('.js-compose-message').focus()
    }
  }
}
</script>
