# linnun
A Twitter client, written in Electron

## Usage
Currently linnun is not considered usable at all. It misses authentication and storage logic,
so the only way of effectively using it is adding your own keys and running/building it yourself.

## Development

### Requirements

* node.js (latest stable should work)

### Preparations

Add your Twitter Application keys to `src/twitter.js` then run following commands:

* `npm install`
* `gulp assets`
* `npm start`

### Building linnun

`npm build:[windows|linux|osx]`

## Roadmap

* [ ] Authentication
  * [ ] Authenticating over Twitter
  * [ ] Storing user secrets
* [ ] Tweets
  * [x] Receiving
  * [x] Sending
  * [x] Replying
  * [ ] Deleting
* [ ] Retweets
  * [x] Distinguished on Timeline
  * [x] Creating
  * [ ] Destroying (Unretweeting)
* [ ] Favorites
  * [x] Creating
  * [ ] Destroying (Unretweeting)
  
## License

linnun is licensed under the MIT License