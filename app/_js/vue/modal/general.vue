<style>
</style>

<template>
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="label">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['id', 'label']
}
</script>