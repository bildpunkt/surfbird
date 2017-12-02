<template>
  <div class="l-modals">
    <authentication-modal></authentication-modal>
    <column-modal></column-modal>
    <profile-modal></profile-modal>
  </div>
</template>

<script>
import AuthenticationModal from './Modal/Authentication'
import ColumnModal from './Modal/Column'
import ProfileModal from './Modal/Profile'

export default {
  name: 'modals',
  components: {
    AuthenticationModal,
    ColumnModal,
    ProfileModal
  }
}
</script>

<style lang="scss">
</style>
