<style>
</style>

<template>
  <div class="drawer">
    <div class="compose">
      <div class="compose-content">
        <div class="compose-header">
          <div class="content">
            <img class="avatar" :src="user.profile_image_url" />
          	<span>Tweeting from</span>@{{ user.screen_name }}
          </div>
          <div class="gradient"></div>
          <img :src="user.profile_banner_url" />
        </div>
        <div class="compose-antiscroll">
          <ul class="nav nav-tabs nav-justified">
            <li role="presentation" class="active"><a href="#composeTweet" aria-controls="composeTweet" role="tab" data-toggle="tab">Tweet</a></li>
            <li role="presentation"><a href="#composeDirectMessage" aria-controls="composeDirectMessage" role="tab" data-toggle="tab">Direct Message</a></li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane compose-container fade in active" id="composeTweet">
              <form action="/" method="HEAD" onsubmit="return false;">
                <p class="compose-text-title">Tweet</p>
                <div class="compose-input-container">
                  <div class="compose-reply" v-if="reply !== undefined">
                    <button type="button" class="close" aria-label="Close" @click="clearReply"><i class="fa fa-close"></i></button>
                    <tweet-header :user="reply.user" :small="true"></tweet-header>
                    <div class="tweet-text">{{{ reply.text_html }}}</div>
                  </div>
                  <textarea class="compose-input js-compose-tweet" @input="characterCount"></textarea>
                </div>
                <div class="pull-right compose-actions">
                  <span class="js-remaining-character-count">140</span>
                  <span class="js-chained-tweets">0</span>
                  <input type="submit" class="btn btn-primary js-compose-tweet-btn" disabled value="Tweet" @click="sendTweet">
                </div>
              </form>
            </div>
            <div role="tabpanel" class="tab-pane compose-container fade" id="composeDirectMessage">
              <form action="/" method="HEAD" onsubmit="return false;">
                <p class="compose-text-title">Recipient</p>
                <div class="compose-recipient-container">
                  <input type="text" class="compose-recipient js-compose-recipient" @input="checkRecipient"></input>
                </div>
                <p class="compose-text-title">Message</p>
                <div class="compose-message-container">
                  <textarea class="compose-message js-compose-message" @input="checkMessage"></textarea>
                </div>
                <div class="pull-right compose-actions">
                  <input type="submit" class="btn btn-primary js-compose-message-btn" disabled value="Message" @click="sendMessage">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const twitter = require('twitter-text')
const ipcRenderer = require('electron').ipcRenderer

export default {
  props: ['user', 'reply'],
  methods: {
    sendTweet (e) {
      var tweet = {}

      if (this.reply !== undefined) {
        tweet = {text: $('.js-compose-tweet').val(), id: this.reply.id_str}
      } else {
        tweet = {text: $('.js-compose-tweet').val()}
      }

      $('js-compose-tweet-btn').attr('disabled', true)
      ipcRenderer.send('surfbird:send:tweet', tweet)
    },
    characterCount (e) {
      var remain = 140 - (twitter.getTweetLength($('.js-compose-tweet').val()) % 140)
      var chains = Math.floor(twitter.getTweetLength($('.js-compose-tweet').val()) / 140)

      if ($('.js-compose-tweet').val().length > 0) {
        $('.js-compose-tweet-btn').attr('disabled', false)
      } else {
        $('.js-compose-tweet-btn').attr('disabled', true)
      }

      $('.js-remaining-character-count').text(remain).css('marginLeft', (chains > 0 ? 0 : '10px'))
      if(chains > 0) {
        $('.js-chained-tweets').text('(' + chains.toString() + ')').css('display', 'inline')
      } else {
        $('.js-chained-tweets').css('display', 'none')
      }
    },
    sendMessage (e) {
      var dm = {}
      
      dm = {text: $('.js-compose-message').val(), recipient: $('.js-compose-recipient').val()}

      ipcRenderer.send('surfbird:send:direct-message', dm)
      $('.js-compose-message-btn').attr('disabled', true)
    },
    checkRecipient (e) {
      if ($('.js-compose-recipient').val().length > 0 && $('.js-compose-message').val().length > 0) {
        $('.js-compose-message-btn').attr('disabled', false)
      } else {
        $('.js-compose-message-btn').attr('disabled', true)
      }
    },
    checkMessage (e) {
      if ($('.js-compose-message').val().length > 0 && $('.js-compose-recipient').val().length > 0) {
        $('.js-compose-message-btn').attr('disabled', false)
      } else {
        $('.js-compose-message-btn').attr('disabled', true)
      }
    },
    clearReply (e) {
      this.$root.$set('reply', undefined)
      $('.js-compose-tweet').val('')
      $('.js-compose-tweet-btn').attr('disabled', true)
    }
  }
}
</script>
