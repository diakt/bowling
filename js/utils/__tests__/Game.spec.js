import {assert} from 'chai'
import Game from '../Game'
import mocha from 'mocha'

const {suite, test} = mocha;

suite('Game', () => {

    suite('#roll()', () => {
        function makeTest(pins) {
            var result = Game.roll(pins);
            pins.push(result);

            test('should be at most 10 summarizing ' + pins.join(', '), () => {
                assert.isAtMost(result, 10);
            });
        }

        [[], [4], [5], [9]].forEach(makeTest);
    });

    suite('#countScore()', () => {
        function makeTest(data) {
            var {pins, expected} = data;
            var result = Game.countScore(pins);
            test('should be ' + expected + ', if pins are ' + pins.join(', '), () => {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {
                pins: [0, 9],
                expected: 9
            },
            {
                pins: [10, 9, 1],
                expected: (10 + 9 + 1) + 9 + 1
            },
            {
                pins: [1, 9, 3, 2],
                expected: (1 + 9 + 3) + (3 + 2)
            },
            {
                pins: [0, 0],
                expected: 0
            }
        ];

        mocks.forEach(makeTest);
    });

    suite('#getAvailablePins()', () => {
        function makeTest(data) {
            var {pins, expected} = data;
            var result = Game.getAvailablePins(pins);
            test('should be ' + expected + ', if pins are ' + pins.join(', '), () => {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {pins: [1], expected: 9},
            {pins: [1, 9], expected: 10},
            {pins: [10, 9], expected: 1},
            {pins: [10, 10], expected: 0},
            {pins: [0, 10], expected: 10},
            {pins: [5, 5, 5], expected: 5},
            {pins: [5, 5, 0], expected: 10}
        ];
        mocks.forEach(makeTest);
    });

    suite('#getMaxScore()', () => {

        function getScore(acc, player) {
            acc.push(player.score.join(', '));
            return acc;
        }

        function makeTest(data) {
            var {players, expected} = data;
            var result = Game.getMaxScore(players);
            var score = players.reduce(getScore, []);
            test('should be ' + expected + ', if players are [' + score.join('], [ ') + ']', () => {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {players: [{score: [0, 1, 3]}, {score: [4, 5, 6]}], expected: 15},
            {players: [{score: [10, 11, 3]}], expected: 24},
            {players: [{score: [1, 3]}, {score: [4, 6]}, {score: [14, 6]}], expected: 20}
        ];
        mocks.forEach(makeTest);
    });

    suite('#isOver()', () => {
        function makeTest(data) {
            var {pins, expected} = data;

            var result = Game.isOver(pins);
            test('should be ' + expected + ', if pins are ' + pins.join(', '), () => {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {pins: [1, 7], expected: true},
            {pins: [7], expected: false},

            {pins: [1, 9, 4, 6], expected: true},
            {pins: [5, 5, 10], expected: true},
            {pins: [1, 9, 6], expected: false},

            {pins: [10, 10], expected: true},
            {pins: [10, 1], expected: false},
            {pins: [10, 1, 2], expected: true}
        ];
        mocks.forEach(makeTest);
    });

    suite('#isStrike()', () => {
        function makeTest(data) {
            var {pins, expected} = data;
            var result = Game.isStrike(pins);
            test('should be ' + expected + ' if the player knocks down all 10 pins on the first roll, ' +
                'where the rolls are ' + pins, () => {
                assert.equal(expected, result);
            });
        }

        var mocks = [
            {pins: [10, 0], expected: true},
            {pins: [10], expected: true},
            {pins: [3], expected: false},
            {pins: [3, 4], expected: false},
            {pins: [0, 10], expected: false},
            {pins: [0, 10, 10], expected: false}
        ];
        mocks.forEach(makeTest);
    });

    suite('#isSpare()', () => {
        function makeTest(data) {
            var {pins, expected} = data;
            var result = Game.isSpare(pins);
            test('should be ' + expected + ' if the player knocks down all 10 pins in two rolls, ' +
                'where the rolls are ' + pins, () => {
                assert.equal(expected, result);
            });
        }

        var mocks = [
            {pins: [3, 3], expected: false},
            {pins: [3, 7], expected: true},
            {pins: [10, 10], expected: false},
            {pins: [0, 10], expected: true},
            {pins: [5], expected: false}
        ];
        mocks.forEach(makeTest);
    });

    suite('#isLastFrame()', () => {
        function makeTest(frame, expected) {
            var result = Game.isLastFrame(frame);
            test('should be ' + expected + ' for frame number ' + frame, () => {
                assert.equal(expected, result);
            });
        }

        [3, 5, 9, 12].forEach(function (frame) {
            makeTest(frame, frame === 9);
        });
    });
});
