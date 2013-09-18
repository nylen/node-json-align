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


describe('Compared to JSON.stringify', function() {
    describe('without indentation, it', function() {
        it('should work the same for a Date'                   , testSameRepr(new Date()));
        it('should work the same for a Number'                 , testSameRepr(44.2));
        it('should work the same for a String'                 , testSameRepr('abcd'));
        it('should work the same for a Boolean'                , testSameRepr(true));
        it('should work the same for null'                     , testSameRepr(null));
        it('should work the same for an Array[0]'              , testSameRepr([]));
        it('should work the same for an Array[1]'              , testSameRepr([123]));
        it('should work the same for an Array[2]'              , testSameRepr([true, 'abcd']));
        it('should work the same for an empty object'          , testSameRepr({}));
        it('should work the same for a simple object'          , testSameRepr({a: 1, b: 2}));
        it('should work the same for a nested object'          , testSameRepr({a: 1, b: { c: 3, d: 4 }}));
        it('should work the same for a complex object'         , testSameRepr({a: [1,2,3], b: 'cde'}));
        it('should work the same for an object containing null', testSameRepr({a: true, b: null, c: ''}));
    });
    describe('with indentation, it', function() {
        it('should work the same for a Date'         , testSameRepr(4, new Date()));
        it('should work the same for a Number'       , testSameRepr(4, 44.2));
        it('should work the same for a String'       , testSameRepr(4, 'abcd'));
        it('should work the same for a Boolean'      , testSameRepr(4, true));
        it('should work the same for null'           , testSameRepr(4, null));
        it('should work the same for an Array[0]'    , testSameRepr(4, []));
        it('should work the same for an Array[1]'    , testSameRepr(4, [123]));
        it('should work the same for an Array[2]'    , testSameRepr(4, [true, 'abcd']));
        it('should work the same for an empty object', testSameRepr(4, {}));
    });
});
