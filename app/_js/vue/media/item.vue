<style>
</style>

<template>
    <div class="media-image" :style="{ backgroundImage: 'url(file://' + item + ')' }">
        <button class="close" @click="pop"><i class="fa fa-close"></i></button>
    </div>
</template>

<script>
export default {
    props: ['item', 'index'],
    methods: {
        pop (e) {
            $('.js-add-picture-btn').attr('disabled', false)
            this.$root.temp.media.splice(this.index, 1)
            this.$destroy
        }
    }
}
</script>