<template>
  <div class="l-drawer">
    <composer></composer>
  </div>
</template>

<script>
import Composer from './Composer'

export default {
  components: {
    Composer
  },
  name: 'drawer'
}
</script>

<style>
.l-drawer {
  background-color: #37474f;
  position: absolute;
  height: 120px;
  bottom: -120px;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0px -3px 10px rgba(0,0,0,0.3);
}
</style>
