import {assert} from 'chai'
import {countArray} from '../functions'
import mocha from 'mocha'

const {suite, test} = mocha;

suite('#countArray()', () => {
    function makeTest(data) {
        var {array, expected} = data;
        var result = countArray(array);
        test('should be ' + expected + ' for [' + array.join(', ') + ']', () => {
            assert.equal(expected, result);
        });
    }

    var mocks = [
        {array: [0, 12, 2, 4], expected: 18},
        {array: [10, 2, 2], expected: 14},
        {array: [0, 1154], expected: 1154},
        {array: [10, 4, 10], expected: 24},
        {array: [10, 12, 2, 4], expected: 28}
    ];

    mocks.forEach(makeTest);
});
