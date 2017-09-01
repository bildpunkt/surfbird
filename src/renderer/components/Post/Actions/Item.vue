<template>
  <li class="c-post__action" @click="func(action.function)">
    {{ icon }}
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
  margin-right: 13px !important;
  padding: 0;
  margin: 0;
  font-family: Batch;
  font-size: 18px;
}
</style>
