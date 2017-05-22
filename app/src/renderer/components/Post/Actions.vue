<template>
  <ul class="c-post__actions">
    <action-item icon="" func="null"></action-item>
    <action-item  v-for="action in actions" :action="action" :icon="action.icon" :func="sendAction"></action-item>
    <action-item icon="" func="null"></action-item>
  </ul>
</template>

<script>
import ActionItem from './Actions/Item'

export default {
  components: {
    ActionItem
  },
  computed: {
    actions: function () {
      // FIXME: Find a cleaner way to get the column owner
      let owner = this.$parent.$parent.$parent.$parent.data.owner

      return this.$store.state.accounts.all[owner].client.ACTIONS
    }
  },
  methods: {
    sendAction: function (action) {
      let data = this.$parent.$parent.data

      this.$store.dispatch('sendAction', {action: action, data: data})
    }
  },
  name: 'actions'
}
</script>

<style lang="scss">
.c-post {
  &__actions {
    width: 100%;
    float: left;
    list-style: none;
    padding: 0;
    margin: 0;
    user-select: none;
  }
}
</style>
