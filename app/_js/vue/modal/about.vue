<style>
</style>

<template>
    <modal id="aboutModal" label="aboutModalLabel">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
            <h4 class="modal-title" id="aboutModalLabel">About</h4>
        </div>
        <div class="modal-body text-center">
            <h1>Surfbird</h1>
            <p><i>early test release</i></p>

            <p>
                Please be aware of many features missing or probably breaking in this version. This is the first open
                release after roughly 4 months of work. If you found any bugs, you can report them on the 
                <a href="https://github.com/surfbirdapp/surfbird/issues">Github repository</a> or mention us on Twitter
                <a href="https://twitter.com/surfbirdapp">@surfbirdapp</a>
            </p>

            <p>
                Thanks for taking your time to test the client and helping us to create a new (and hopefully good) Twitter
                experience for desktops!
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </modal>
</template>

<script>
export default {}
</script>    