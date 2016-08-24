<style>
</style>

<template>
    <modal id="settingsModal" label="settingsModalLabel">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
            <h4 class="modal-title" id="settingsModalLabel">{{ $t('settings.title') }}</h4>
        </div>
        <div class="modal-body">
            <div class="form-group form-horizontal clearfix">
                <label for="#theme-select" class="col-sm-2 control-label">{{ $t('settings.theme.title') }}</label>
                <div class="col-sm-10">
                    <select id="theme-select" class="form-control" @change="themeChange">
                        <option value="#">None</option>
                        <option v-for="theme in themes" value="file:///{{ theme.fullpath }}">{{ theme.name }}</option>
                    </select>
                </div>
                <div class="col-sm-5 col-sm-offset-2 input-section">
                    <a @click="themeReload" href="#" class="btn btn-primary btn-block">{{ $t('settings.theme.reload') }}</a>
                </div>
                <div class="col-sm-5 input-section">
                    <a @click="themeOpen" href="#" class="btn btn-default btn-block">{{ $t('settings.theme.open') }}</a>
                </div>
                <label for="#sound-select" class="col-sm-2 control-label input-section">{{ $t('settings.sound.title') }}</label>
                <div class="col-sm-10 input-section">
                    <select id="sound-select" class="form-control" @change="soundChange">
                        <option value="assets/sounds/notification.mp3">Default</option>
                        <option v-for="sound in sounds" value="file:///{{ sound.fullpath }}">{{ sound.name }}</option>
                    </select>
                </div>
                <div class="col-sm-4 col-sm-offset-2 input-section">
                    <a @click="soundReload" href="#" class="btn btn-primary btn-block">{{ $t('settings.sound.reload') }}</a>
                </div>
                <div class="col-sm-4 input-section">
                    <a @click="soundOpen" href="#" class="btn btn-default btn-block">{{ $t('settings.sound.open') }}</a>
                </div>
                <div class="col-sm-2 input-section">
                    <a @click="soundPlay" href="#" class="btn btn-default btn-block"><i class="fa fa-play"></i></a>
                </div>   
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </modal>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer;

export default {
  props: ['themes', 'sounds'],
  methods: {
    themeChange() {
      if ($('#theme-select option:selected').val() == '#') {
        $('#theme-tag').attr('href', $('#theme-select option:selected').val())
      } else {
          $('#theme-tag').attr('href', $('#theme-select option:selected').val())
      }
    },
    soundChange() {
      $('#notification-tag').attr('src', $('#sound-select option:selected').val())
    },
    themeReload() {
      ipcRenderer.send('surfbird:send:themes', true);
    },
    soundReload() {
      ipcRenderer.send('surfbird:send:sounds', true);
    },
    themeOpen() {
      ipcRenderer.send('surfbird:open:themes', true);
    },
    soundOpen() {
      ipcRenderer.send('surfbird:open:sounds', true);
    },
    soundPlay() {
      document.getElementById('notification-tag').play();
    }
  }
}
</script>
