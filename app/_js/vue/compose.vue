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
          {{{ $t('message.hello') }}}
          <form action="/" method="HEAD" onsubmit="return false;">
            <textarea id="tweet" placeholder="Tweet here bby"></textarea>
            <input type="submit" id="send" value="Send">
          </form>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>
