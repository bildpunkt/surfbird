<style>
</style>

<template>
  <div class="app-header">
    <div class="top-navigation">
      <a class="app-header-link" @click="showDrawer"><i class="fa fa-send"></i></a>
    </div>
    <div class="bottom-navigation">
      <div class="dropup">
        <a class="app-header-link" href="#" id="settingsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-cog large-icon"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-right settings-dropdown" aria-labelledby="settingsDropdown">
          <li><a href="#" data-toggle="modal" data-target="#aboutModal">About</a></li>
          <li><a href="#" data-toggle="modal" data-target="#settingsModal">Settings</a></li>
          <li class="divider"></li>
          <li class="dropdown-header">Filtering</li>
          <li><a href="#" data-toggle="modal" data-target="#mutesModal">Mutes</a></li>
          <li><a href="#" data-toggle="modal" data-target="#hiddenModal">Hidden Tweets</a></li>
          <li class="divider"></li>
          <li class="dropdown-header">Debug</li>
          <li><a href="#" @click="devTools">Developer Tools</a></li>
          <li class="divider"></li>
          <li><a href="#" @click="logout">Logout</a></li>
        </ul>  
      </div>    
    </div>  
  </div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer

export default {
  methods: {
    showDrawer (e) {
      $('.app-content').toggleClass('is-open')
    },
    logout (e) {
      ipcRenderer.send('surfbird:logout', true)
    },
    devTools (e) {
      ipcRenderer.send('surfbird:send:devtools', true)
    }
  }
}
</script>
