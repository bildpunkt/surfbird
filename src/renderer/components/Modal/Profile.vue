<template>
    <modal name="profile-modal" @before-open="beforeOpen">
        <h1>Create a profile</h1>

        <p>
            <label for="column-name"> Profile Name</label>
            <input type="text" for="column-name" v-model="profile_name"/>
        </p>

        <p>
            <button @click="createColumn">Create profile</button>
        </p>
    </modal>
</template>

<script>
    export default {
        name: 'profile-modal',
        data: function () {
            return {
                profile_name: ''
            }
        },
        methods: {
            beforeOpen () {
                this.profile_name = ''
            },
            createColumn () {
                let payload = {
                    name: this.profile_name,
                }

                this.$store.dispatch('addProfile', payload)
                this.$modal.hide('profile-modal')
            }
        }
    }
</script>

<style>

</style>
