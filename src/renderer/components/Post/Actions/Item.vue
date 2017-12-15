<template>
  <li class="c-post__action" @click="func(action.function)">
    <icon :name="icon" size="18"></icon>
  </li>
</template>

<script>
export default {
  props: ['action', 'icon', 'func'],
  name: 'post-action'
}
</script>

<style lang="scss">
.c-post__action {
  color: #c1ccd1;
  cursor: pointer;
  float: left;
  margin: 0;
  margin-right: 13px !important;
  padding: 0;
}
</style>
