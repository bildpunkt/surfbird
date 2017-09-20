<template>
  <article class="c-post" :data-post-id="data.id_str">
    <div class="c-post__content">
      <div class="c-post__inner" v-if="data.retweeted_status == undefined">
        <post-header avatar="true" :user="postUser"></post-header>
        <div class="c-post__body">
          <p class="c-post__text" v-html="data.text_html"></p>
          <post-media v-if="data.extended_entities !== undefined"></post-media>
          <post-quote :data="data.quoted_status" v-if="data.is_quote_status"></post-quote>
          <post-footer></post-footer>
        </div>
      </div>
      <div class="c-post__inner" v-else>
        <post-context :user="data.user"></post-context>
        <post-header avatar="true" :user="postUser"></post-header>
        <div class="c-post__body">
          <p class="c-post__text" v-html="data.retweeted_status.text_html"></p>
          <post-media v-if="data.retweeted_status.extended_entities !== undefined"></post-media>
          <post-quote :data="data.retweeted_status.quoted_status" v-if="data.retweeted_status.is_quote_status"></post-quote>
          <post-footer></post-footer>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import PostHeader from './Post/Header'
import PostFooter from './Post/Footer'
import PostMedia from './Post/Media'
import PostQuote from './Post/Quoted'
import PostContext from './Post/Context'

export default {
  props: ['id', 'colindex'],
  components: {
    PostHeader,
    PostFooter,
    PostMedia,
    PostQuote,
    PostContext
  },
  computed: {
    data: function () {
      return this.$store.state.profiles.all[this.$store.state.profiles.activeProfile].columns[this.colindex].postStorage.posts[this.id]
    },
    postUser: function () {
      if (this.data.retweeted_status !== undefined) {
        return this.data.retweeted_status.user
      } else {
        return this.data.user
      }
    }
  },
  provide: function () {
    let provider = {}

    Object.defineProperty(provider, 'postData', {
      enumerable: true,
      get: () => this.data
    })

    return provider
  },
  name: 'post'
}
</script>

<style lang="scss">
.c-post {
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
