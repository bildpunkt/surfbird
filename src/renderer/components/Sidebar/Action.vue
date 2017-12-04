<template>
  <div class="c-sidebar__button" @click="func()">
      <icon :name="icon"></icon>
  </div>
</template>

<script>
export default {
  props: ['icon', 'func']
}
</script>

<style>
.c-sidebar__button {
  padding: 0 10px;
  margin-top: 10px;
  color: #b0bec5;
  font-size: 24px;
  text-align: center;
  user-select: none;
  cursor: pointer;
}
</style>
