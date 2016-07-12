<style>
</style>

<template>
    <modal id="settingsModal" label="settingsModalLabel">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
            <h4 class="modal-title" id="settingsModalLabel">Settings</h4>
        </div>
        <div class="modal-body">
            <div class="form-group form-horizontal clearfix">
                <label for="#theme-select" class="col-sm-2 control-label">Theme</label>
                <div class="col-sm-10">
                    <select id="theme-select" class="form-control">
                        <option value="#">None</option>
                        <option v-for="theme in themes" value="file:///{{ theme.fullpath }}">{{ theme.name }}</option>
                    </select>
                </div>
                <div class="col-sm-5 col-sm-offset-2 input-section">
                    <a id="reloadThemes" href="#" class="btn btn-primary btn-block">Reload Themes</a>
                </div>
                <div class="col-sm-5 input-section">
                    <a id="openThemes" href="#" class="btn btn-default btn-block">Open Themes Folder</a>
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
export default {
  props: ['themes']
}
</script>
