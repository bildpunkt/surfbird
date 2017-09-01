<template>
  <div>
    <dragArea></dragArea>
    <controls></controls>
  </div>
</template>

<script>
import DragArea from './Window/DragArea'
import Controls from './Window/Controls'
export default {
  components: {
    DragArea,
    Controls
  },
  name: 'window'
}
</script>

<style>
</style>
