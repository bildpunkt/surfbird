<template>
  <article class="c-tweet" :data-tweet-id="data.id_str">
    <div class="c-tweet__content">
      <div class="c-tweet__inner" v-if="data.retweeted_status == undefined">
        <tweet-header avatar="true"></tweet-header>
        <div class="c-tweet__body">
          <p class="c-tweet__text" v-html="data.text_html"></p>
          <tweet-media v-if="data.extended_entities !== undefined"></tweet-media>
          <tweet-quote :data="data.quoted_status" v-if="data.is_quote_status"></tweet-quote>
          <tweet-footer></tweet-footer>
        </div>
      </div>
      <div class="c-tweet__inner" v-else>
        <tweet-context :user="data.user"></tweet-context>
        <tweet-header avatar="true"></tweet-header>
        <div class="c-tweet__body">
          <p class="c-tweet__text" v-html="data.retweeted_status.text_html"></p>
          <tweet-media v-if="data.retweeted_status.extended_entities !== undefined"></tweet-media>
          <tweet-quote :data="data.retweeted_status.quoted_status" v-if="data.retweeted_status.is_quote_status"></tweet-quote>
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
import TweetQuote from './Tweet/Quoted'
import TweetContext from './Tweet/Context'

export default {
  props: ['id', 'colindex'],
  components: {
    TweetHeader,
    TweetFooter,
    TweetMedia,
    TweetQuote,
    TweetContext
  },
  computed: {
    data: function () {
      return this.$store.state.profiles.all[this.$store.state.profiles.activeProfile].columns[this.colindex].tweetStorage.tweets[this.id]
    }
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
