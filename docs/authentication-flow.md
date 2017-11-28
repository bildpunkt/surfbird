# Authentication Flow

This document will detail the authentication flow Surfbird is following at the time of writing (and will be updated accordingly with changes)

## Main Process

The main process is a combination of Electron and Node.js APIs being prepared. The [main script file](https://github.com/surfbirdapp/surfbird/blob/master/src/main/index.js) creates the BrowserWindow and initializes all required events on it.

The created BrowserWindow then loads the generated HTML file with our renderer script.

## Renderer Process

The renderer process is where most of the action is going on. It includes Vue, style and client libraries to access the microblogging services implemented.

### Account Request

As soon as the renderer process is loaded and the Vue mount is initialized, the process will send out a request to the main process using the
channel `surfbird:request:accounts`.

The main process is then returning all already authenticated accounts in an array over the `surfbird:get:accounts` channel. Now here are two
possible outcomes from this request:

1. If there are accounts available, they will be added to the store so that they are accessible in the renderer process
2. If no accounts were returned by the request, a modal prompting the user to authenticate with a service will be opened

### Authentication

If no account has been authenticated to Surfbird prior, a modal prompting the user to authenticate with a service will be opened.

On creation, the modal component will request all available services from the main process using the `surfbird:request:services` channel.

The main process is then returning all available services over the `surfbird:get:services` channel.

With the services available, the modal will generate links that enable a user to connect with the specified services. If a link is clicked,
a event will be fired that sends a authentication request to the main process on the `surfbird:authentication:start` channel, handing over `{ service: 'service-identifier' }` as a payload.

Back to the main process, after receiving the service identifier, it will initialize a new Authentication class with the supplied identifier,
calling the `authenticate` method, which will prompt the user to authorize Surfbird getting access to the users account on the service.

Once authentication has been successful the received tokens will be sent back to the renderer process over the `surfbird:authentication:done`
channel. The main process receives the sent data and pushes the newly authenticated account into the store.

### Account Addition

_(both outcomes from the `surfbird:get:accounts` request lead here)_

Once the tokens have been received, an action `addAccount` with the tokens as payload will be dispatched to the store.

Inside the then committed state mutation `ADD_ACCOUNT` a new
Account class will be pushed into the state. On creation of this class, the API client for the corresponding service will be initialized with the given tokens.

After the account has been added, another action `refreshUserInfo` will be dispatched, which not only verifies the authenticated user for valid tokens, but also returns user data. We take the user data and save it inside the corresponding account with the state mutation `REFRESH_USER_INFO` to have it available for displaying in the interface.