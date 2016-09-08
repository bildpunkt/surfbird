<style>
</style>

<template>
  <div class="tweet-header">
    <img class="tweet-avatar" :class="{ 'small': small, 'hidden': hidden }" :src="user.profile_image_url"/>
    {{ user.name }} <small>{{ user.screen_name}}</small>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    small: {
      type: Boolean,
      required: false
    },
    hidden: {
      type: Boolean,
      required: false
    }
  }
}
</script>
