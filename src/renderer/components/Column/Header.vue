<template>
  <header class="c-column__header">
    <h1 class="c-column__title">
      {{ data.name }}
      <span class="c-column__title-attribution">
        @{{ user.screen_name }}
      </span>
    </h1>
  </header>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    user: function () {
      return this.$store.state.accounts.all[this.data.owner].user
    }
  },
  name: 'column-header'
}
</script>

<style lang="scss">
.c-column {
  &__header {
    box-sizing: border-box;
    position: relative;
    height: 50px;
    padding: 0 10px;
    line-height: 50px;
    flex-shrink: 0;
  }

  &__title {
    font-size: 24px;
    font-weight: normal;
    margin: 0;

    &-attribution {
      font-size: 16px;
      color: #b0bec5;
    }
  }
}
</style>
