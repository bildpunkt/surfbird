<style>
</style>

<template>
    <modal id="mutesModal" label="mutesModalLabel">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
            <h4 class="modal-title" id="mutesModalLabel">Mutes</h4>
        </div>
        <div class="modal-body clearfix">
            <label for="#mutes-select" class="col-sm-2 control-label">Mute</label>
            <div class="col-sm-10">
                <select id="mutes-select" class="form-control">
                    <option value="keyword">Text content</option>
                    <option value="user">User</option>
                    <option value="source">Source</option>
                </select>
            </div>
            <label for="#mutes-input" class="col-sm-2 control-label input-section">Using</label>
            <div class="col-sm-10 input-section">
                <input type="text" id="mutes-input" class="form-control" @input="muteCheck"></input>
            </div>
            <div class="col-sm-10 col-sm-offset-2 input-section">
                <button @click="mute" href="#" class="btn btn-primary js-mute-btn" disabled>Mute</button>
            </div>

            <ul class="nav nav-pills nav-justified">
                <li role="presentation" class="active"><a class="input-section" href="#mutesUsers" aria-controls="mutesUsers" role="tab" data-toggle="tab">Users</a></li>
                <li role="presentation"><a class="input-section" href="#mutesKeywords" aria-controls="mutesKeywords" role="tab" data-toggle="tab">Keywords</a></li>
                <li role="presentation"><a class="input-section" href="#mutesSources" aria-controls="mutesSources" role="tab" data-toggle="tab">Sources</a></li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane compose-container fade in active" id="mutesUsers">
                    <p v-if="users.length == 0">
                        No users muted yet!
                    </p>    
                    <p v-for="user in users">
                        Muting user @{{ user }}
                        <button type="button" class="close" @click="popUser($index)" aria-label="Close"><i class="fa fa-close"></i></button>
                    </p>
                </div>
                <div role="tabpanel" class="tab-pane compose-container fade" id="mutesKeywords">
                    <p v-if="keywords.length == 0">
                        No keywords muted yet!
                    </p>   
                    <p v-for="keyword in keywords">
                        Muting keyword "{{ keyword }}"
                        <button type="button" class="close" @click="popKeyword($index)" aria-label="Close"><i class="fa fa-close"></i></button>
                    </p>
                </div> 
                <div role="tabpanel" class="tab-pane compose-container fade" id="mutesSources">
                    <p v-if="sources.length == 0">
                        No sources muted yet!
                    </p>   
                    <p v-for="source in sources">
                        Muting source {{{ source }}}
                        <button type="button" class="close" @click="popSource($index)" aria-label="Close"><i class="fa fa-close"></i></button>
                    </p>
                </div> 
            </div>    
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </modal>
</template>

<script>
export default {
    props: ['users', 'keywords', 'sources'],
    methods: {
        muteCheck (e) {
            if ($("#mutes-input").val().length == 0) {
                $('.js-mute-btn').attr('disabled', true)
            } else {
                $('.js-mute-btn').attr('disabled', false)
            }
        },
        mute (e) {
            var userMutes = this.$root.mutes.users
            var keywordMutes = this.$root.mutes.keywords
            var sourceMutes = this.$root.mutes.sources

            if ($('#mutes-select option:selected').val() == "keyword") {
                keywordMutes.push($("#mutes-input").val())
            } else if ($('#mutes-select option:selected').val() == "user") {
                userMutes.push($("#mutes-input").val())
            } else if ($('#mutes-select option:selected').val() == "source") {
                sourceMutes.push($("#mutes-input").val())
            }
            // TODO: add mute function
            $('#mutes-input').val('')
            $('.js-mute-btn').attr('disabled', true)
        },
        popUser (e, index) {
            this.$root.mutes.users.splice(index, 1)
        },
        popKeyword (e, index) {
            this.$root.mutes.keywords.splice(index, 1)
        },
        popSource (e, index) {
            this.$root.mutes.sources.splice(index, 1)
        }
    }
}
</script>   