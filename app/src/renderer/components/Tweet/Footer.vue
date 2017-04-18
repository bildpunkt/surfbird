<template>
  <footer class="c-tweet__footer">
    <actions></actions>
  </footer>
</template>

<script>
import Actions from './Actions'

export default {
  components: {
    Actions
  },
  name: 'tweet-footer'
}
</script>

<style lang="scss">
.c-tweet {
  &__footer {
    display: block;
    margin-top: 3px;

    &:before {
      display: block;
      content: " ";
    }

    &:after {
      clear: both;
    }
  }
}
</style>
