<template>
  <ul class="c-post__actions">
    <action-item icon="" func="null"></action-item>
    <action-item icon="" func="null"></action-item>
    <action-item icon="" func="null"></action-item>
    <action-item icon="" func="null"></action-item>
  </ul>
</template>

<script>
import ActionItem from './Actions/Item'

export default {
  components: {
    ActionItem
  },
  name: 'actions'
}
</script>

<style lang="scss">
.c-post {
  &__actions {
    width: 100%;
    float: left;
    list-style: none;
    padding: 0;
    margin: 0;
    user-select: none;
  }
}
</style>
