#json-align [![Build status](http://img.shields.io/travis/nylen/node-json-align.svg?style=flat)](https://travis-ci.org/nylen/node-json-align) [![npm package](http://img.shields.io/npm/v/json-align.svg?style=flat)](https://www.npmjs.org/package/json-align)

This module provides a function and a command-line script that pretty-print
JSON strings with consecutive values aligned at the same column for improved
readability.

Before:

```js

{
    "name": "json-align",
    "author": "James Nylen <jnylen@gmail.com>",
    "description": "Library and script to pretty-print JSON files with values aligned together.",
    "version": "...",
    "repository": {
        "type": "git",
        "url": "https://github.com/nylen/node-json-align"
    },
...
```

After:

```js

{
    "name"        : "json-align",
    "author"      : "James Nylen <jnylen@gmail.com>",
    "description" : "Library and script to pretty-print JSON files with values aligned together.",
    "version"     : "...",
    "repository"  : {
        "type" : "git",
        "url"  : "https://github.com/nylen/node-json-align"
    },
...
```

Based on [Douglas Crockford's `json2.js`](https://github.com/douglascrockford/JSON-js/blob/master/json2.js).

##Usage

In code (first do `npm install json-align`):

    JSON.stringifyAligned = require('json-align');

On the command line (first do `sudo npm install -g json-align`):

    json-align --help

The command-line script will output to stdout unless the `-i`/`--in-place`
option is given.

##Parameters

    JSON.stringifyAligned(obj, [replacer], [spaces], [alignAllValues])
    // or
    JSON.stringifyAligned(obj, alignAllValues, [spaces])

 - `replacer`: Like in `JSON.stringify`, this is a value transformation
   function, or an array of properties to serialize.
 - `spaces`: Like in `JSON.stringify`, a number of spaces (or string) to indent
   by (the default is 4)
 - `alignAllValues`: By default, a new alignment group will be started each
   time an array or object value is encountered.  If this option is set to
   `true`, then each object will have all of its values aligned together.

##Examples

```js
JSON.stringifyAligned({abc: 1, defgh: 2})
{
    "abc"   : 1,
    "defgh" : 2
}
```

```js
JSON.stringifyAligned({abc: 1, defgh: [2,3,4], ijk: 5})
{
    "abc"   : 1,
    "defgh" : [
        2,
        3,
        4
    ],
    "ijk" : 5   // Note that this value is not aligned with the first two,
                // since there is an array or object value before it.
}
```

```js
JSON.stringifyAligned({abc: 1, defgh: [2,3,4], ijk: 5}, null, 2, true)
{
  "abc"   : 1,
  "defgh" : [
    2,
    3,
    4
  ],
  "ijk"   : 5
}
```
