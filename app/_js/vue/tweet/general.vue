<style>
</style>

<template>
  <div class="tweet" :class="{ 'hidden': hidden }" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.user.screen_name }}" v-if="content.retweeted_status === undefined">
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
      return this.$root.tweetStorage[this.id]
    },
    hidden: function () {
      if (this.$root.hidden.includes(this.content.id_str)) {
        return true
      } else if (this.$root.hidden.includes(this.content.in_reply_to_status_id_str)) {
        return true
      } else if (this.content.retweeted_status !== undefined && this.$root.hidden.includes(this.content.retweeted_status.id_str)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
