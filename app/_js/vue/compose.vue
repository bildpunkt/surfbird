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
          <div class="compose-container">
            {{{ $t('message.hello') }}}
            <form action="/" method="HEAD" onsubmit="return false;">
              <div class="compose-input-container">
                <textarea id="tweet" class="compose-input" placeholder="Tweet here bby" @input="characterCount"></textarea>
              </div>
              <div class="pull-right compose-actions">
                <span class="js-remaining-character-count">140</span>
                <span class="js-chained-tweets">0</span>
                <input type="submit" class="btn btn-primary" id="send" value="Send">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const twitter = require('twitter-text')

export default {
  props: ['user'],
  methods: {
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
