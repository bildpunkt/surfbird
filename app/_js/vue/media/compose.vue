<style>
.compose-media-wrapper {
    padding: 5px;
}
</style>

<template>
    <div class="tweet-media-wrapper media-{{ media.length }} compose-media-wrapper" v-if="media.length > 0">
        <media-item v-for="item in media" :item="item" :index="$index">
    </div>
</template>

<script>
export default {
    props: ['media']
}
</script>