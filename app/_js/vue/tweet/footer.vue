<style>
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
            <a href="#" class="retweet" @click="retweet">
                <i class="fa fa-retweet"></i>
            </a>
        </li>
        <li class="action-item">
            <a href="#" class="favorite" @click="favorite">
                <i class="fa fa-heart"></i>
            </a>
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
      $('.js-compose-tweet').attr('data-tweet-id', this.content.id_str)
      $('[href="#composeTweet"]').tab('show')

      $('.js-compose-tweet').val("@" + this.content.user.screen_name + " ")
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
    }
  }
}
</script>
