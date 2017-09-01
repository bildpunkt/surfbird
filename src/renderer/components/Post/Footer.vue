<template>
  <footer class="c-post__footer">
    <actions></actions>
  </footer>
</template>

<script>
import Actions from './Actions'

export default {
  components: {
    Actions
  },
  name: 'post-footer'
}
</script>

<style lang="scss">
.c-post {
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
