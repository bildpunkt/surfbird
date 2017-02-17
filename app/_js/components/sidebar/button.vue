<style>
</style>

<template>
  <div class="c-sidebar__button" @click="func()">
      {{ icon }}
  </div>
</template>

<script>
export default {
  props: ['icon', 'func']
}
</script>
