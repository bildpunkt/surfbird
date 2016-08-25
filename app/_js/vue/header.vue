<style>
</style>

<template>
  <div class="app-header">
    <div class="top-navigation">
      <a class="app-header-link" @click="showDrawer"><i class="fa fa-send"></a>
    </div>
    <div class="bottom-navigation">
      <div class="dropup">
        <a class="app-header-link" href="#" id="settingsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-cog large-icon"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-right settings-dropdown" aria-labelledby="settingsDropdown">
          <li><a href="#">About</a></li>
          <li><a href="#" data-toggle="modal" data-target="#settingsModal">Settings</a></li>
          <li><a id="logout" href="#">Logout</a></li>
        </ul>  
      </div>    
    </div>  
  </div>
</template>

<script>
export default {
  methods: {
    showDrawer (e) {
      $('.app-content').toggleClass('is-open')
    }
  }
}
</script>
