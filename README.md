# webext-i18n

[![Build Status](https://travis-ci.org/ivantsov/webext-i18n.svg?branch=master)](https://travis-ci.org/ivantsov/webext-i18n)
[![Coverage Status](https://coveralls.io/repos/github/ivantsov/webext-i18n/badge.svg?branch=master)](https://coveralls.io/github/ivantsov/webext-i18n?branch=master)

This package simplifies work with i18n in Web Extensions.

### Install

`npm install webext-i18n --save-dev`

### Usage

For instance, you have the following structure:

```
/src
    /locales
        en.js
        de.js
```

To generate locales for your Web Extension you can use the following code:

```js
const i18n = require('webext-i18n');

i18n({
    inputDir: './src/locales',
    outputDir: './dist/locales'
}).then(res => console.log('Generating locales is finished.');
```

It will create `dist/locales` directory with `en.json` and `de.json` files inside.

### API

The package contains only one method (the default export).

#### Options

- `inputDir` - directory with locales.

- `outputDir` - directory where generated files should be placed.

Returns a `Promise` that will be resolved when all locales are generated.

### Why?

I believe that in most cases you only need `message` field for every translation entity and such fields as `description` and `placeholders` are unnecessary.
This's why localization files could look like this:

```json
{
    "title": {
        "message": "Super title"  
    },
    "error": {
        "message": "Something went wrong..."
    }
}
```

But we can go further and use the value of a `message` field as the value of a translation entity itself:

```json
{
    "title": "Super title",
    "error": "Something went wrong..."
}
```

Moreover, now we can use nested fields e.g. to specify a namespace for the different parts of the extension like *browser action* or *content script*. Also it's more scalable and nicer to use JS instead of JSON:

```js
{
    popup: {
        title: 'Super title',
        description: 'Super description',
        buttons: {
            login: 'Login',
            remove: 'Remove account'
        }
    }
    contentScript: {
       action: 'Super action name',
       text: 'Lorem ipsum'
    },
    notifications: {
        newItem: 'You have a new item',
        deletedItem: 'You just deleted an item'
    }
}
```
