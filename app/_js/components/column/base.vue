<style>
</style>

<template>
  <section class="c-column">
    <div class="c-column__holder">
      <div class="c-column__panel">
        <column-header :data="data.header"></column-header>
        <column-content></column-content>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['data', 'index'],
  created: function() {
    this.$store.dispatch('startStreaming', this.index)
  }
}
</script>
