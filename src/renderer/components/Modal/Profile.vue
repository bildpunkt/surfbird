<template>
    <modal name="profile-modal" @before-open="beforeOpen">
        <h1>Create a profile</h1>

        <p>
            <label for="profile-name"> Profile Name</label>
            <input type="text" for="profile-name" v-model="profileName"/>
        </p>

        <p>
            <button @click="createProfile">Create profile</button>
        </p>
    </modal>
</template>

<script>
    export default {
        name: 'profile-modal',
        data: function () {
            return {
                profileName: ''
            }
        },
        methods: {
            beforeOpen () {
                this.profileName = ''
            },
            createProfile () {
//                let payload = {
//                    name: this.profileName,
//                }
                this.$store.dispatch('addProfile', this.profileName)
                this.$modal.hide('profile-modal')
            }
        }
    }
</script>

<style>

</style>
