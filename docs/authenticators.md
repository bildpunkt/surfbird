# Authenticators

Authenticators are modules which authorize you with a given service they implement.

## Adding Authenticators

### Location

All available authenticators can be found in `src/main/authentication/services`

You don't need to register or add your authenticators anywhere. The `index` script inside the folder is
already handing over all services in this location over to the Authentication class.

### Required Methods

**TODO: Write actual specification for this**

#### `data`

This method takes no arguments, it's used to return data required for authenticator listings, like in the authentication modal if you want
to add a new account.

**Example:**

```js
data () {
  return {
    identifier: 'service',
    name: 'My Service'
  }
}
```

#### `authenticate`

This method takes two arguments, `credentials` and `callback`, both are already given from the Authentication class constructor.

`credentials` will be the object containing your services API keys required for authorization. They are defined and loaded from the file
`src/resources/credentials.json`. If the identifier of your service is `service`, the structure inside the JSON file would have to look like this:

```json
{
  "service": {
    "consumerKey": "",
    "consumerSecret": "",
    "callbackURL": ""
  }
}
```

You then will have access to all your required keys inside the `credentials` object.

The `callback` function should return the acquired tokens a user needs to authenticate with the service, for later use in the client libraries
to interact with the service. The callback function will handle saving the tokens to disk, you only need to pass the keys back in the callback.

Other than that you just authenticate the user in this method, preferably opening a new window prompting a user to login to specified service.

---

A reference implementation of an authenticator can be found [here](https://github.com/surfbirdapp/surfbird/blob/master/src/main/authentication/services/twitter.js)