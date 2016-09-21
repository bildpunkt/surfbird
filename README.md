<div align='center'>
  <img width=500px src='http://file.pixelde.su/surfbird-logo.png'>
</div>

<p align='center'>
  A Twitter client, built on Electron
</p>

## Usage
To use Surfbird, either download one of the [pre-built releases](https://github.com/surfbirdapp/surfbird/releases) or build the client yourself using
the instructions provided below.

**Note:** Surfbird is in no way feature-complete and might be broken for some users. Current provided
releases are for testing purposes!

## Development

### Requirements

* node.js (latest stable should work)
* [Twitter App Tokens](https://apps.twitter.com) with following settings:
  * Permissions: _Read, Write and Access direct messages_
  * Sign in with Twitter: _No_

### Getting the Source

First, clone the repository using following command:

```
git clone --recursive git@github.com:surfbirdapp/surfbird.git
```

Alternatively, if you already cloned the repository, you can just run:

```
git submodule init
git submodule update
```

This is to get all required submodules, currently only consisting of the [client assets](https://github.com/surfbirdapp/board),
which you need for the client to properly display stuff, or even display anything.

### Preparations

Copy `surfbird.example.json` to `surfbird.json`, add your keys and then run following commands:

* `npm install`
* `gulp assets`
* `npm start`

**Information about `callback_url`:** It pretty much does not matter what URL you use here, as long
as it can hold get parameters without removing them, the client only needs to be able to grab them.

### Building Surfbird

`npm run build:[windows|linux|osx]`

### Coding Style

Surfbird is following the [Javascript Standard Styleguide](https://github.com/feross/standard)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Contributing

### Bug Reporting / Feature Requests

You are always free to report bugs or request new features with opening an issue on the [issue tracker](https://github.com/surfbirdapp/surfbird/issues),
but please do yourself and the team the favor of searching for your bug/request before opening another
issue for something that might already exist!

### Pull Requests 

Want to add a new feature yourself? That's awesome!

You are always free to contribute new features to Surfbird, the most important thing being that you keep
the projects structure intact (or if you have a better solution, open an issue and let us discuss!) and also
adhere to Javascript Standard style.

You can easily check this with running `npm run lint` and you'll get all style errors printed out for you! If
there are nits you can't really fix that easily, leave them be and just mention that in your Pull Request!

Other than that you are perfectly ready to submit your PR, have fun contributing!

## License

Surfbird is licensed under the MIT License
