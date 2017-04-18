<template>
  <article class="c-tweet">
    <div class="c-tweet__content">
      <div class="c-tweet__inner">
        <tweet-header></tweet-header>
        <div class="c-tweet__body">
          <p class="c-tweet__text">This is some scrollable column content</p>
          <tweet-media></tweet-media>
          <tweet-footer></tweet-footer>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import TweetHeader from './Tweet/Header'
import TweetFooter from './Tweet/Footer'
import TweetMedia from './Tweet/Media'

export default {
  components: {
    TweetHeader,
    TweetFooter,
    TweetMedia
  },
  name: 'tweet'
}
</script>

<style lang="scss">
.c-tweet {
  display: block;

  &__content {
    position: relative;
    padding: 8px 10px;
  }

  &__inner {
    padding-left: 58px;
    line-height: 1.28578em;
    word-break: break-word;
    word-wrap: break-word;

    &:before, &:after {
      display: block;
      content: " ";
    }

    &:after {
      clear: both;
    }
  }

  &__body {
    min-height: 35px;
  }

  &__text {
    margin: 0;
    white-space: pre-wrap;
    overflow: hidden;
  }
}
</style>
