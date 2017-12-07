<template>
  <div class="c-composer">
    <textarea class="c-composer__input" :placeholder="$t('message.whats_happening', ['user'])">
    </textarea>
    <div class="c-composer__footer">
      <ul class="c-composer__actions">
        <li class="c-composer__action c-composer__action-message">
          <icon name="mail" size="18"></icon>
        </li>
        <li class="c-composer__action c-composer__action-media">
          <icon name="image" size="18"></icon>
        </li>
      </ul>
      <div class="c-composer__submit">
        <span class="c-composer__character-count">
          140
        </span>
        <button class="c-composer__send">
          {{ $t("message.send") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.c-composer {
  display: block;
  position: relative;
  height: 120px;
  width: 648px;
  background-color: #fff;
  margin: 0 auto;
  padding: 5px;

  &__input {
    width: 100%;
    box-shadow: none;
    outline: none;
    resize: none;
    border: none;
    height: 80px;
  }

  &__footer {
    position: absolute;
    left: 0;
    bottom: 10px;
    right: 0;
    padding: 5px;

    &:before {
      display: block;
      content: " ";
    }

    &:after {
      clear: both;
    }
  }

  &__actions {
    float: left;
    list-style: none;
    padding: 0;
    margin: 0;
    user-select: none;
    margin-left: 5px;
  }

  &__action {
    color: #000;
    cursor: pointer;
    float: left;
    margin-right: 13px !important;
    padding: 0;
    margin: 0;
  }

  &__submit {
    float: right;
  }

  &__send {
    background-color: #29b6f6;
    border: none;
    padding: 3px 14px;
    color: #fff;
    font-weight: bold;
    border-radius: 4px;
    outline: none;
  }

  &__character-count {
    font-size: 14px;
    color: #c0c0c0;
    line-height: 18px;
    padding-right: 5px;
  }
}
</style>
