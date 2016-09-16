<style>
</style>

<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="tweet-content">
                <button type="button" class="close" aria-label="Close" @click="pop"><i class="fa fa-close"></i></button>
                <tweet-header :user="content.user"></tweet-header>
                <div class="tweet-body">{{{ content.text_html }}}</div>
            </div>
        </div>    
    </div>    
</template>

<script>
export default {
    props: ['id', 'index'],
    computed: {
        content: function () {
            return this.$root.tweetStorage[this.id]
        }
    },
    methods: {
        pop (e) {
            this.$root.hidden.splice(this.index, 1)
            this.$destroy
        }
    }
}
</script>