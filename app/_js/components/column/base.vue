<style>
</style>

<template>
  <section class="c-column">
    <div class="c-column__holder">
      <div class="c-column__panel">
        <column-header :data="data"></column-header>
        <column-content></column-content>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['data', 'index'],
  created: function() {
    let payload = {index: this.index, profile: this.$store.state.profiles.activeProfile}
    this.$store.dispatch('startStreaming', payload)
  }
}
</script>
