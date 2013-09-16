var fs     = require('fs'),
    mocha  = require('mocha'),
    should = require('should'),
    path   = require('path');

JSON.stringifyAligned = require('../index');

function testFile(fn) {
    var args = [].slice.call(arguments, 1);
    fn = path.join(__dirname, fn);
    return function() {
        var contents = fs.readFileSync(fn).toString(),
            test     = JSON.stringifyAligned.apply(this, [JSON.parse(contents)].concat(args)) + '\n';

        if (test !== contents) {
            console.log(test);
            console.log(contents);
        }
        test.should.equal(contents);
    };
}


suite('Basic');

test('package.json, defaults', testFile('json/4s-package.json'));
test('package.json, 4 spaces', testFile('json/4s-package.json', null, 4));
test('package.json, 2 spaces', testFile('json/2s-package.json', null, 2));

test('package.json, all keys 1', testFile('json/4s-all-package.json', null, 4, true));
test('package.json, all keys 2', testFile('json/4s-all-package.json', true));

test('package.json, 2 spaces, all keys 1', testFile('json/2s-all-package.json', null, 2, true));
test('package.json, 2 spaces, all keys 2', testFile('json/2s-all-package.json', true, 2));

test('package.json, tabs', testFile('json/t-package.json', null, '\t'));
test('package.json, tabs, all keys', testFile('json/t-all-package.json', true, '\t'));


suite('Examples from Readme');

test('Example 1', function() {
    JSON.stringifyAligned({abc: 1, defgh: 2}).should.equal(
        '{\n    "abc"   : 1,\n    "defgh" : 2\n}');
});

test('Example 2', function() {
    JSON.stringifyAligned({abc: 1, defgh: [2,3,4], ijk: 5}).should.equal(
        '{\n    "abc"   : 1,\n    "defgh" : [\n        2,\n        3,\n        4\n    ],\n    "ijk" : 5\n}');
});

test('Example 2', function() {
    JSON.stringifyAligned({abc: 1, defgh: [2,3,4], ijk: 5}, null, 2, true).should.equal(
        '{\n  "abc"   : 1,\n  "defgh" : [\n    2,\n    3,\n    4\n  ],\n  "ijk"   : 5\n}');
});
