<style>
</style>

<template>
  <div class="tweet-header">
    <img class="tweet-avatar" v-bind:src="user.profile_image_url"/>
    {{ user.name }} <small>{{ user.screen_name}}</small>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>
