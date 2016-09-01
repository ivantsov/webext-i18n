# webext-i18n

[![Build Status](https://travis-ci.org/ivantsov/webext-i18n.svg?branch=master)](https://travis-ci.org/ivantsov/webext-i18n)
[![Coverage Status](https://coveralls.io/repos/github/ivantsov/webext-i18n/badge.svg?branch=master)](https://coveralls.io/github/ivantsov/webext-i18n?branch=master)
[![npm version](https://badge.fury.io/js/webext-i18n.svg)](https://badge.fury.io/js/webext-i18n)

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

And `en.js` may contain something like that:

```js
{
    popup: {
        title: 'Super title',
        description: 'Super description',
        buttons: {
            login: 'Login',
            remove: 'Remove account'
        }
    },
    contentScript: {
       action: 'Super action name',
       text: 'Lorem ipsum'
    }
}
```

Yeah, **nested** translation **entities** **without** specifying **`message` field**! And yes, it's not an appropriate format for a Web Extension, so you need to run the code below to generate a proper locales files:

```js
const i18n = require('webext-i18n');

i18n({
    inputDir: './src/locales',
    outputDir: './dist/locales'
}).then(res => console.log('Generating locales is finished.');
```

It will create `dist/locales` directory with `en.json` and `de.json` files inside. And `en.json` will be look like:

```json
{
    "popup_title": {
        "message": "Super title"
    },
    "popup_description": {
        "message": "Super description"
    },
    "popup_buttons_login": {
        "message": "Login"
    },
    "popup_buttons_remove": {
        "message": "Remove account"
    },
    "contentScript_action": {
        "message": "Super action name"
    },
    "contentScript_text": {
        "message": "Lorem ipsum"
    }
}
```

### API

The package contains only one method (the default export).

#### Options

- `inputDir` - directory with locales.

- `outputDir` - directory where generated files should be placed.

Returns a `Promise` that will be resolved when all locales are generated.
