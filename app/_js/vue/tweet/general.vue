<style>
</style>

<template>
  <div class="tweet" :class="{ 'hidden': hidden, 'hidden': muted }" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.user.screen_name }}" v-if="content.retweeted_status === undefined">
    <div class="tweet-content">
      <tweet-header :user="content.user"></tweet-header>
      <tweet-body :tweet="content"></tweet-body>
      <tweet-footer :content="content"></tweet-footer>
    </div>
  </div>
  <div class="tweet" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.user.screen_name }}" v-else>
    <div class="tweet-content">
      <div class="tweet-context">{{ content.user.name }} retweeted</div>
      <tweet-header :user="content.retweeted_status.user"></tweet-header>
      <tweet-body :tweet="content.retweeted_status"></tweet-body>
      <tweet-footer :content="content"></tweet-footer>
    </div>
  </div>
</template>

<script>
const matcher = require('../../utils/matcher')
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: false
    },
    hidden: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    content: function () {
      return this.$root.storage.tweets[this.id]
    },
    hidden: function () {
      var hiddenStorage = this.$root.storage.hidden
      
      if (hiddenStorage.includes(this.content.id_str)) {
        return true
      } else if (hiddenStorage.includes(this.content.in_reply_to_status_id_str)) {
        return true
      } else if (this.content.retweeted_status !== undefined && hiddenStorage.includes(this.content.retweeted_status.id_str)) {
        return true
      } else {
        return false
      }
    },
    muted: function () {
      var userMutes = this.$root.mutes.users
      var keywordMutes = this.$root.mutes.keywords
      var sourceMutes = this.$root.mutes.sources

      if (userMutes.length !== 0 ) {
        if (matcher(this.content.user.screen_name, userMutes)) {
          return true
        }

        if (matcher(this.content.text, userMutes)) {
          return true
        }
      }

      if (keywordMutes.length !== 0 ) {
        if (matcher(this.content.text, keywordMutes)) {
          return true
        }
      }

      if (sourceMutes.length !== 0 ) {
        if (matcher(this.content.source, sourceMutes)) {
          return true
        }
      }
    }
  }
}
</script>
