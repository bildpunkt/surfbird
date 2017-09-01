<template>
  <div class="l-content">
    <columns></columns>
    <drawer></drawer>
  </div>
</template>

<script>
import Columns from './Columns'
import Drawer from './Drawer'

export default {
  components: {
    Columns,
    Drawer
  },
  name: 'app-content'
}
</script>

<style>
.l-content {
  position: absolute;
  top: 0;
  left: 50px;
  right: 0;
  bottom: 120px;
  margin-left: 0;
  overflow: visible;
  z-index: 1;
}
</style>
