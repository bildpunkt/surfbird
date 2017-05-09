<template>
  <div class="l-modals">
    <authentication-modal></authentication-modal>
  </div>  
</template>

<script>
import AuthenticationModal from './Modal/Authentication'

export default {
  name: 'modals',
  components: {
    AuthenticationModal
  }
}
</script>

<style lang="scss">
</style>
