<style>
</style>

<template>
  <div class="l-columns">
    <column v-for="(c, index) in columns" :data="c" :index="index"></column>
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
