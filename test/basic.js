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


describe('Basic functionality', function() {
    it('should serialize package.json with defaults', testFile('json/4s-package.json'));
    it('should serialize package.json with 4 spaces', testFile('json/4s-package.json', null, 4));
    it('should serialize package.json with 2 spaces', testFile('json/2s-package.json', null, 2));

    it('should serialize package.json with all keys (3 args)', testFile('json/4s-all-package.json', null, 4, true));
    it('should serialize package.json with all keys (1 arg)',  testFile('json/4s-all-package.json', true));

    it('should serialize package.json with 2 spaces, all keys (3 args)', testFile('json/2s-all-package.json', null, 2, true));
    it('should serialize package.json with 2 spaces, all keys (2 args)', testFile('json/2s-all-package.json', true, 2));

    it('should serialize package.json with tabs', testFile('json/t-package.json', null, '\t'));
    it('should serialize package.json with tabs, all keys', testFile('json/t-all-package.json', true, '\t'));
});


describe('Examples from Readme', function() {
    it('should serialize Example 1', function() {
        JSON.stringifyAligned({abc: 1, defgh: 2}).should.equal(
            '{\n    "abc"   : 1,\n    "defgh" : 2\n}');
    });

    it('should serialize Example 2', function() {
        JSON.stringifyAligned({abc: 1, defgh: [2,3,4], ijk: 5}).should.equal(
            '{\n    "abc"   : 1,\n    "defgh" : [\n        2,\n        3,\n        4\n    ],\n    "ijk" : 5\n}');
    });

    it('should serialize Example 2', function() {
        JSON.stringifyAligned({abc: 1, defgh: [2,3,4], ijk: 5}, null, 2, true).should.equal(
            '{\n  "abc"   : 1,\n  "defgh" : [\n    2,\n    3,\n    4\n  ],\n  "ijk"   : 5\n}');
    });
});
