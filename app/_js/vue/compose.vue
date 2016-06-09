<style>
</style>

<template>
  <div class="drawer">
    <div class="compose">
      <div class="compose-content">
        <div class="compose-header">
          New Tweet
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
</script>
