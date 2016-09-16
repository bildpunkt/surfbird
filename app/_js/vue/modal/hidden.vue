<style>
</style>

<template>
    <modal id="hiddenModal" label="hiddenModalLabel">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
            <h4 class="modal-title" id="hiddenModalLabel">Hidden Tweets</h4>
        </div>
        <div class="modal-body">
            <div class="alert alert-info" v-if="tweets.length == 0">
                No hidden tweets yet! If you hide tweets, you won't be able to see any replies to or
                retweets of them. You can un-hide tweets using this modal right here!
            </div>    
            <hidden-tweet v-for="tweet in tweets" :id="tweet" :index="$index" v-else></hidden-tweet>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </modal>
</template>

<script>
export default {
    props: ['tweets']
}
</script>    