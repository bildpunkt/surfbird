<div align='center'>
  <img width=500px src='http://file.pixelde.su/linnun-logo.png'>
</div>

<p align='center'>
  A Twitter client, built on Electron
</p>

## Usage
Currently linnun is not considered usable at all. It misses authentication and storage logic,
so the only way of effectively using it is adding your own keys and running/building it yourself.

## Development

### Requirements

* node.js (latest stable should work)

### Preparations

Copy `linnun.example.json` to `linnun.json`, add your keys and then run following commands:

* `npm install`
* `gulp assets`
* `npm start`

**Information about `callback_url`:** It pretty much does not matter what URL you use here, as long
as it can hold get parameters without removing them, the client only needs to be able to grab them.

### Building linnun

`npm run build:[windows|linux|osx]`

**Note:** Because of electron-packager acting up, building does not really work as of now. If you can
fix building, I welcome a pull request!

## Roadmap

* [x] Authentication
  * [x] Authenticating over Twitter
  * [x] Storing user secrets
* [ ] Tweets
  * [x] Receiving
  * [x] Sending
  * [x] Replying
  * [ ] Deleting
* [ ] Retweets
  * [x] Distinguished on Timeline
  * [x] Creating
  * [x] Destroying (Unretweeting)
  * [ ] Design
* [ ] Favorites
  * [x] Creating
  * [x] Destroying (Unfavoriting)
  * [ ] Design
* [ ] Interactions
* [ ] Profiles
* [ ] Twitter Card Support (implement an iframe that displays `https://twitter.com/i/cards/tfw/v1/[tweet-id]` if available)

## License

linnun is licensed under the MIT License
