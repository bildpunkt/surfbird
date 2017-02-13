<style>
</style>

<template>
  <div class="l-columns">
    <column v-for="c in columns" :data="c"></column>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  computed: mapGetters({
    columns: 'allColumns'
  })
}
</script>
