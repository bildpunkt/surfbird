<template>
  <a class="c-post__media-image" :href="medium.media_url_https" :style="{ backgroundImage: 'url(' + medium.media_url_https + ')' }">
  </a>
</template>

<script>
export default {
  props: ['medium']
}
</script>

<style lang="scss">
.c-post__media {
  &-image {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    background-position: 50% 50%;
    background-size: cover;
    background-color: #c1ccd1;

    &:nth-child(2) {
      left: 3px;
    }

    &:nth-child(3) {
      top: 3px;
    }

    &:nth-child(4) {
      top: 3px;
      left: 3px;
    }
  }

  &[data-media-count="1"] {
    .c-post__media-image {
      height: 100%;
    }
  }

  &[data-media-count="2"] {
    .c-post__media-image {
      width: 50%;
    }
  }

  &[data-media-count="3"] {
    .c-post__media-image {
      padding: 0;
      width: 50%;
      height: 50%;
      float: left;

      &:first-child {
        height: 100%;
      }

      &:nth-child(3) {
        left: 3px;
        height: calc(50% - 3px);
      }
    }
  }

  &[data-media-count="4"] {
    .c-post__media-image {
      padding: 0;
      width: 50%;
      height: 50%;
      float: left;
    }
  }
}
</style>
