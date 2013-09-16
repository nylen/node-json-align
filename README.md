#json-align

This module provides a function that pretty-prints JSON strings with
consecutive values aligned at the same column for improved readability.

Based on [Douglas Crockford's `json2.js`](https://github.com/douglascrockford/JSON-js/blob/master/json2.js).

##Usage

    npm install json-align

    JSON.stringifyAligned = require('json-align');

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

```
JSON.stringifyAligned({abc: 1, defgh: 2})
{
    "abc"   : 1,
    "defgh" : 2
}
```

```
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

```
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
