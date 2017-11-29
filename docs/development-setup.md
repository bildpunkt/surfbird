# Development Setup

If you want to build Surfbird for testing purposes or set up an environment to start contributing, there are only a few steps to follow!

## Prerequisites

* [Node.js](https://nodejs.org/en/) 7 or higher
* Twitter App Credentials

### Acquiring Twitter App Credentials

To get your own set of Twitter App Credentials, follow these steps:

1. Go to [apps.twitter.com](https://apps.twitter.com)
2. Create a new app and fill in the requested details
3. Open the "Permissions" tab and select the "Read, Write and Access direct messages" permission and update your settings

You then can find the consumer key/secret you need in the "Keys and Access Tokens" tab.

To use these tokens, open the projects repository and navigate to `src/resources`, here you'll find a `credentials.example.json`. Copy this file and save it in the same location, just removing the `.example` part (e.g. `credentials.json`). Open the newly created file and paste your keys into the fitting sections.

_Even if you plan to implement a service that does not require credentials, the `credentials.json` file needs to exist, otherwise Surfbird won't start up._

## Setup

To install all dependencies required by Surfbird, just run

```
npm install
```

in the projects root directory. _It's recommended to grab your favorite beverage in the meantime, this can take a while._

If everything went okay and the installation of the packages succeeded, you are ready to run Surfbird!

> If there are any issues with package installations or related to Electron, it's recommended to check out [electron-vue's Getting Started section](https://simulatedgreg.gitbooks.io/electron-vue/content/en/getting_started.html) regarding this topic.

## Running

To run Surfbird in development mode, run following command:

```
npm run dev
```

You'll see some colorful console output from electron-vue and Webpack, shortly afterwards a window should pop up and voilà, you're ready to code!

You're also able to code right away and see the changes in the window, as code changes will reload the script!

## Building

Want to build Surfbird? Another simple command at hand:

```
npm run build
```

Surfbird will then be built providing both an installer (on Windows/Mac) and a unpacked release for your current platform.