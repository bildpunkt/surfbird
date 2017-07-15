<template>
  <div class="l-modals">
    <authentication-modal></authentication-modal>
    <column-modal></column-modal>
  </div>  
</template>

<script>
import AuthenticationModal from './Modal/Authentication'
import ColumnModal from './Modal/Column'

export default {
  name: 'modals',
  components: {
    AuthenticationModal,
    ColumnModal
  }
}
</script>

<style lang="scss">
</style>
