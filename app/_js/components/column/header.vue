<style>
</style>

<template>
  <header class="c-column__header">
    <h1 class="c-column__title">
      {{ data.name }}
      <span class="c-column__title-attribution">
        @{{ user.screenname }}
      </span>
    </h1>
  </header>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    user: function() {
      return this.$store.state.accounts.all[this.data.owner].user
    }
  }
}
</script>
