<div align='center'>
  <img width=500px src='http://file.pixelde.su/surfbird-logo.png'>
</div>

<p align='center'>
  A Twitter client, built on Electron
</p>

## Usage
Currently Surfbird is not really usable. It has authentication and basic storage logic,
but settings are not saved and several things are unoptimized and uncached.

## Development

### Requirements

* node.js (latest stable should work)

### Preparations

Copy `surfbird.example.json` to `surfbird.json`, add your keys and then run following commands:

* `npm install`
* `gulp assets`
* `npm start`

**Information about `callback_url`:** It pretty much does not matter what URL you use here, as long
as it can hold get parameters without removing them, the client only needs to be able to grab them.

### Building Surfbird

`npm run build:[windows|linux|osx]`

## License

Surfbird is licensed under the MIT License
