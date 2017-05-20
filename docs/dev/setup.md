## Development Setup

### Prerequisites

* Node.js (latest)
* Twitter App Tokens (get them [here](https://apps.twitter.com))  
  with following settings:
  * **Permissions:** Read, Write and Access direct messages
  * **Sign in with Twitter:** No

### Token Setup

This step is required as Surfbird won't run nor build if you have no
credentials added (or the `credentials.json` is just missing)

* copy `app/resources/credentials.example.json` to `app/resources/credentials.json`
* add your Twitter App Tokens

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).