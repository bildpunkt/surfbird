<template>
  <header class="c-tweet__header">
    <a class="c-tweet__account-link" href="#">
      <div class="c-tweet__image">
        <img class="c-tweet__avatar" :src="user.profile_image_url">
      </div>
      <div class="c-tweet__account-name">
        <span class="c-tweet__account-name--inline">
          <b class="c-tweet__account-fullname">{{ user.name }}</b>
          <span class="c-tweet__account-username">@{{ user.screen_name }}</span>
        </span>
      </div>
    </a>
    <time class="c-tweet__timestamp">
      <a class="c-tweet__timestamp-link" href="#">
        now
      </a>
    </time>
  </header>
</template>

<script>
export default {
  computed: {
    user: function () {
      return this.$parent.data.user
    }
  },
  name: 'tweet-header'
}
</script>

<style lang="scss">
.c-tweet {
  &__header {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-align: baseline;
    align-items: baseline;
  }

  &__account-link {
    display: block;
    max-width: 100%;
    color: #000;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    min-width: 1px;
    min-height: 1px;
  }

  &__image {
    position: relative;
    margin-left: -58px;
    float: left;
    margin-right: 10px;
  }

  &__avatar {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 10%;
    margin-top: 2px;
    margin-bottom: 2px;
    top: 0;
    left: 0;
    right: 0;
  }

  &__account-name {
    overflow: hidden;
    word-break: break-word;
    word-wrap: break-word;

    &--inline {
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      max-width: 100%;
      vertical-align: bottom;
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis;
    }
  }

  &__account-fullname, &__account-username {
    line-height: 1;
  }

  &__account-username {
    color: #b0bec5;
  }

  &__timestamp {
    margin-bottom: 2px;
    line-height: 1;
    color: #b0bec5;

    &-link {
      color: #b0bec5;
      text-decoration: none;
    }
  }
}
</style>
