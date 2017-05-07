<template>
<div class="c-tweet-context">
  <div class="c-tweet-context__icon-container">
    <i class="c-tweet-context__icon">
      
    </i>  
  </div>
  <div class="c-tweet-context__text">
    <a href="#">{{ user.name }}</a> retweeted
  </div>  
</div>  
</template>

<script>
export default {
  props: ['user'],
  name: 'tweet-context'
}
</script>

<style lang="scss">
.c-tweet-context {
  color: #8899a6;
  margin-left: -58px;
  padding-bottom: 4px;
  font-size: 12px;

  &__icon-container {
    width: 48px;
    float: left;
    margin-right: 10px;
  }

  &__icon {
    color: #8899a6;
    display: inline-block;
    vertical-align: top;
    width: 1em;
    float: right;
    font-size: 16px;
    margin-top:-20px;
    font-family: Batch;
  }

  &__text {
    overflow: hidden;
    word-break: break-word;
    word-wrap: break-word;
  }
}
</style>
