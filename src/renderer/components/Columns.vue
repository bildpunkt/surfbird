<template>
  <div class="l-columns">
    <column v-for="(c, index) in columns" :data="c" :id="c.id" :key="index"></column>
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
      let ids = this.$store.getters.getColumnIds(this.$store.state.profiles.activeProfile)
      return this.$store.getters.getColumns(ids)
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
