<template>
  <li class="l-window__control" @click="func()">
    <icon name="x-square"></icon>
  </li>
</template>

<script>
export default {
  props: {
    func: Function
  }
}
</script>

<style>
</style>
