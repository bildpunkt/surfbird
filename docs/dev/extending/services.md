## Services

Surfbird is, in the `next` release not just capable of being a Twitter client, it also can (at least from the technical side) support a multitude of services, as long as developers provide authentication and client implementations inside Surfbird for it.

### Authentication Providers

> You can find all current authentication providers in `app/src/main/authentication/services`, the index file in the same folder handles referencing all of those so you don't need to manually import them somewhere else.

As the client gets the authentication request with your service name, the authentication handler will try to execute the function `authenticate` with two arguments:

* `credentials`: Your service most likely needs credentials. Add them to the `credentials.json` where the key matches the service name.
* `callback`: The callback function that should be called if authentication was successful. This callback should include an argument `token` which is an object including everything you need to log in the client to your service.

Once the authentication request has been successful, Surfbird will save the tokens into `.surfbird` in the users home directory and also add the user to the application itself.

### Clients

> You can find all current authentication providers in `app/src/renderer/clients`, the index file in the same folder handles referencing all of those so you don't need to manually import them somewhere else.

Clients are used to provide API access to Surfbird, to log in the user and to perform actions with the specified service.

Most of this here is pretty much TODO still and probably needs quite a bit of rethinking and refactoring, as the frontend part binds it to being just a Twitter client for now.

You can always use the already provided Twitter client as a reference to what's there yet.

### Some more TODOs

* List of available services from the `main` process, so a list can be shown on authentication initialization (instead of hardcoding it)
* Waaaaaay more stuff.