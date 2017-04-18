<template>
  <a class="c-tweet__media-image" href="#">
  </a>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.c-tweet__media {
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
    .c-tweet__media-image {
      height: 100%;
    }
  }

  &[data-media-count="2"] {
    .c-tweet__media-image {
      width: 50%;
    }
  }

  &[data-media-count="3"] {
    .c-tweet__media-image {
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
    .c-tweet__media-image {
      padding: 0;
      width: 50%;
      height: 50%;
      float: left;
    }
  }
}
</style>
