var mocha  = require('mocha'),
    should = require('should');

JSON.stringifyAligned = require('../index');

function testSameRepr(spaces, val) {
    if (typeof val == 'undefined') {
        val = spaces;
        spaces = null;
    }
    return function() {
        JSON.stringifyAligned(val, null, spaces)
            .should.equal(JSON.stringify(val, null, spaces));
    };
}


suite('Same as JSON.stringify with no indent');

test('Date'    , testSameRepr(new Date()));
test('Number'  , testSameRepr(44.2));
test('String'  , testSameRepr('abcd'));
test('Boolean' , testSameRepr(true));
test('null'    , testSameRepr(null));
test('Array[0]', testSameRepr([]));
test('Array[1]', testSameRepr([123]));
test('Array[2]', testSameRepr([true, 'abcd']));
test('Object 1', testSameRepr({}));
test('Object 2', testSameRepr({a: 1, b: 2}));
test('Object 3', testSameRepr({a: 1, b: { c: 3, d: 4 }}));
test('Object 4', testSameRepr({a: [1,2,3], b: 'cde'}));
test('Object 5', testSameRepr({a: true, b: null, c: ''}));


suite('Same as JSON.stringify with indent');

test('Date'    , testSameRepr(4, new Date()));
test('Number'  , testSameRepr(4, 44.2));
test('String'  , testSameRepr(4, 'abcd'));
test('Boolean' , testSameRepr(4, true));
test('null'    , testSameRepr(4, null));
test('Array[0]', testSameRepr(4, []));
test('Array[1]', testSameRepr(4, [123]));
test('Array[2]', testSameRepr(4, [true, 'abcd']));
test('Object 1', testSameRepr(4, {}));
