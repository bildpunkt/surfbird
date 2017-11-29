# Clients

Clients are the modules which interact with a given services, e.g. fetch posts from them or execute actions on them.

## Adding Clients

### Location

All available clients can be found in `src/renderer/clients`

You don't need to register or add your clients anywhere. The `index` script inside the folder is
already handing over all services in this location over to the Account class.

### Required Methods/Properties

**TODO: Write actual specification for this**

#### `api`

The `api` property of a client should include the API client used to interact with the service. As it needs to be defined in the
classes constructor, it will have all required tokens available in the `tokens` parameter.

#### `ACTIONS`

The `ACTIONS` property of a client should include all possible actions a user can execute on a post of that specific service. An
action is a object with three keys, `name`, `icon` and `function`.

* **`name`:** The name of the action
* **`icon`:** The icon that should be displayed for the action
* **`function`:** The name of the function that should be executed if the action is clicked

**FIXME: Please refactor this as soon as possible**

Functions that are called with the function name in the `function` property reside in the client class itself. They have two arguments
`post` and `callback`, where first is the post returned by the executed action and the callback, which should return the updated post after
the action has been executed on it.

#### `COLUMN_TYPES`

The `COLUMN_TYPES` property of a client should be an array containing the identifiers of all available column types that can be created with
this client.

#### `COLUMNS`

The `COLUMNS` property of a client should be an object containing all definitions for the available column types a client can create.
The initial key should be the identifier that is also used in the `COLUMN_TYPES` array.

A column has following properties:

* **`name`:** The name of the column type
* **`icon`:** The column icon
* **`type`:** Type of data retrieval (should be either `streaming` or `polling`)
* **`functions`:** An object with definitions for function names for data retrieval
  * **`initialData`:** This function will be called on column initialization to prefill a column
  * **`data`:** Depending on `type` this function either streams or polls data for a column

**FIXME: Please refactor this as soon as possible**

Functions that are called with the function name in the `functions` property reside in the client class itself. They have only one argument `callback` which is the function that returns the post so it can be added to the corresponding column store from where the function has been
called.

---

A reference implementation of a client can be found [here](https://github.com/surfbirdapp/surfbird/blob/master/src/renderer/clients/twitter.js)
