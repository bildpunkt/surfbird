<template>
  <div class="l-columns">
    <column v-for="(c, index) in columns" :data="c" :index="index" :key="index"></column>
  </div>
</template>

<script>
import Column from './Column'

export default {
  components: {
    Column
  },
  computed: {
    columns: function () {
      return this.$store.getters.getColumns(this.$store.state.profiles.activeProfile)
    }
  },
  name: 'columns'
}
</script>

<style>
.l-columns {
  box-sizing: border-box;
  height: 100%;
  overflow: visible;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
