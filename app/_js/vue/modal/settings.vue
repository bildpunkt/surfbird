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
                <label for="#theme-select" class="col-sm-3 control-label">Theme</label>
                <div class="col-sm-9">
                    <select id="theme-select" class="form-control">
                        <option value="#">None</option>
                        <option v-for="theme in themes" value="{{ theme }}">{{ theme }}</option>
                    </select>
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
