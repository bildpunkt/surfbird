<template>
<div class="c-post-context">
  <div class="c-post-context__icon-container">
    <icon name="repeat" size="12"></icon>
  </div>
  <div class="c-post-context__text">
    <a href="#">{{ user.name }}</a> retweeted
  </div>
</div>
</template>

<script>
export default {
  props: ['user'],
  name: 'post-context'
}
</script>

<style lang="scss">
.c-post-context {
  display: flex;
  flex-direction: row;
  color: #8899a6;
  margin-left: -58px;
  padding-bottom: 4px;
  font-size: 12px;

  &__icon-container {
    width: 48px;
    margin-right: 10px;
    text-align: right;
  }

  &__icon {
    color: #8899a6;
    vertical-align: top;
    width: 1em;
    font-size: 16px;
    margin-top:-20px;
  }

  &__text {
    flex-grow: 1;
    overflow: hidden;
    word-break: break-word;
    word-wrap: break-word;
  }
}
</style>
