<style>
.tweet-dropdown {
    left: unset;
    right: 35%;
    float: right;
}
</style>

<template>
<div class="tweet-footer clearfix">
    <ul class="tweet-actions">
        <li class="action-item">
            <a href="#" class="reply" @click="reply">
                <i class="fa fa-reply"></i>
            </a>
        </li>
        <li class="action-item">
            <a href="#" class="retweet" rel="retweet" @click="retweet">
                <i class="fa fa-retweet" :class="{ 'active': content.retweeted }"></i>
            </a>
        </li>
        <li class="action-item">
            <a href="#" class="favorite" rel="favorite" @click="favorite">
                <i class="fa fa-heart" :class="{ 'active': content.favorited }"></i>
            </a>
        </li>
        <li class="action-item dropdown">
            <a href="#" class="more" rel="more" id="moreDropdown{{ content.id_str }}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-ellipsis-h"></i>
            </a>
            <ul class="dropdown-menu tweet-dropdown" aria-labelledby="moreDropdown{{ content.id_str }}">
                <li><a href="#" @click="hide">Hide Tweet</a></li>
            </ul>    
        </li>
    </ul>  
</div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer;

// TODO: e.target is not really behaving like it should, fix that sometime

export default {
  props: ['content'],
  methods: {
    reply (e) {
      // get reply from storage and set it
      var reply = this.$root.tweetStorage[this.content.id_str]
      var currentUser = this.$root.user
      this.$root.$set('reply', reply)

      // show Tweet tab if it's not visible yet
      $('[href="#composeTweet"]').tab('show')
      
      // prepare and add mentions
      var mentions = ''

      if (this.content.user.screen_name !== currentUser.screen_name) {
        mentions = `@${this.content.user.screen_name} `
      }

      reply.entities.user_mentions.forEach(function (user) {
        if (user.screen_name !== currentUser.screen_name) {
          mentions += `@${user.screen_name} `
        }
      })

      $('js-compose-tweet-btn').attr('disabled', false)
      $('.js-compose-tweet').val(mentions)
      $('.js-compose-tweet').focus()
    },
    retweet (e) {
      if ($(e.target).hasClass('active')) {
          tweet = {id: this.content.id_str, type: "unretweet"}
          ipcRenderer.send('surfbird:send:retweet', tweet)
          $(e.target).removeClass('active')
      } else {
          tweet = {id: this.content.id_str, type: "retweet"}
          ipcRenderer.send('surfbird:send:retweet', tweet)
          $(e.target).addClass('active')
      }
    },
    favorite (e) {
      if ($(e.target).hasClass('active')) {
          tweet = {id: this.content.id_str, type: "unfavorite"}
          ipcRenderer.send('surfbird:send:favorite', tweet)
          $(e.target).removeClass('active')
      } else {
          tweet = {id: this.content.id_str, type: "favorite"}
          ipcRenderer.send('surfbird:send:favorite', tweet)
          $(e.target).addClass('active')
      }
    },
    hide (e) {
        this.$parent.hidden = true
        this.$root.hidden.push(this.content.id_str)
    }
  }
}
</script>
