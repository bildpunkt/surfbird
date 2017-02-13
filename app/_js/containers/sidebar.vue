<style>
</style>

<template>
  <div class="l-sidebar">
    <div class="c-sidebar__button" @click="addColumn()">
      
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addColumn(e) {
      this.$store.dispatch('addColumn', {header: {name: "Test Column", username: "test"}})
    }
  }
}
</script>
