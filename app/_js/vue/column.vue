<style>
</style>

<template>
    <div class="column">
        <div class="column-panel">
            <div class="column-header">{{ title }}</div>
            <div class="column-content">
                <div class="column-scroller">
                    <slot>
                      <loader message="Loading..."></loader>
                    </slot>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
