<div align='center'>
  <img width=500px src='http://file.pixelde.su/surfbird-logo.png'>
</div>

<p align='center'>
  A Twitter client, built on Electron
</p>

## Next

This branch is a complete rewrite of Surfbird. Expect things to be missing or breaking at first.

## Development

### Requirements

* node.js (latest stable should work)

### Preparations

* `npm install` or `yarn install`, whatever floats your boat
* `gulp assets` for asset compilation (alternatively, `npm run assets` does the same, just from the installed binary)
* `npm start` to start the Electron application

### Guidelines

#### Coding Style

Surfbird is following the [Javascript Standard Styleguide](https://github.com/feross/standard)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

You can check up Standard-style with executing following scripts inside the project folder:

* `npm run style` checks the style and prints out found mistakes
* `npm run style-fix` attempts to fix all found style errors by itself

#### Commit Style

Surfbird is [commitizen](http://commitizen.github.io/cz-cli/)-friendly. To easily follow commitizen-standards, you can use
`npm run commit` to create a commit in the specified format. (don't forget to `git add` your files before)

## License

Surfbird is licensed under the MIT License
