# Locales

Translating Surfbird and bringing it to other languages.

## Adding/Updating Locales

### Location

You can find all currently available locales in `src/renderer/i18n/locales`

You don't need to register or add new locales anywhere. The `index` script inside the folder is
already handing over all locales in this location over to the internationalization library.

The filename of the new locale should be the matching ISO 639-1 language code!

### Structure

To have a general structure of locales across all components of the client, following style has been picked for the keys:

```
component[.subcomponent].item
```

To give a clearer example on this, the structure of locale-keys should try to follow the component (folder) structure as possible. This makes
it easier to understand how to add new sections to the locales and also locating used locales across components.

```
modal.profile.title
```

The given structure tells us that this locale is the **title** of the **Profile Modal** (which you can find in `components/modal/profile`)

