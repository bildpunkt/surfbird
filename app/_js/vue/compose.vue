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
              {{{ $t('message.hello') }}}
              <form action="/" method="HEAD" onsubmit="return false;">
                <div class="compose-input-container">
                </div>
                <div class="pull-right compose-actions">
                  <span class="js-remaining-character-count">140</span>
                  <span class="js-chained-tweets">0</span>
                </div>
              </form>
            </div>
            <div role="tabpanel" class="tab-pane compose-container fade" id="composeDirectMessage">
              <p>Coming Soon</p>
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
  props: ['user'],
  methods: {
    sendTweet (e) {
      var tweet = {}

      if ($('.js-compose-tweet').data('tweet-id') !== undefined) {
        tweet = {text: $('.js-compose-tweet').val(), id: $('.js-compose-tweet').data('tweet-id')}
      } else {
        tweet = {text: $('.js-compose-tweet').val()}
      }

      $('js-compose-tweet-btn').attr('disabled', true)
      ipcRenderer.send('surfbird:send:tweet', tweet)
    },
    characterCount (e) {
      var remain = 140 - (twitter.getTweetLength($('#tweet').val()) % 140)
      var chains = Math.floor(twitter.getTweetLength($('#tweet').val()) / 140)
      $('.js-remaining-character-count').text(remain).css('marginLeft', (chains > 0 ? 0 : '10px'))
      if(chains > 0) {
        $('.js-chained-tweets').text('(' + chains.toString() + ')').css('display', 'inline')
      } else {
        $('.js-chained-tweets').css('display', 'none')
      }
    }
  }
}
</script>
