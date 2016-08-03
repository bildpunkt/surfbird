<style>
</style>

<template>
  <div class="loader">
    <div class="wrapper">
      <div class="la-ball-scale-multiple la-2x">
        <div></div>
        <div></div>
        <div></div>
      </div>
    <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>
