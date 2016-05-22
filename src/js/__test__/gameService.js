suite('gameService', function () {
    var assert = chai.assert;
    var gameService = app.gameService;

    suite('#roll()', function () {
        function makeTest(pins) {
            var result = gameService.roll(pins);
            pins.push(result);

            test('should be at most 10 summarizing ' + pins.join(', '), function () {
                assert.isAtMost(result, 10);
            });
        }

        [[], [4], [5], [9]].forEach(function (pins) {
            makeTest(pins);
        });
    });

    suite('#countScore()', function () {
        function makeTest(pins, expected) {
            var result = gameService.countScore(pins);
            test('should be ' + expected + ', if pins are ' + pins.join(', '), function () {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {
                pins: [0, 9],
                score: 9
            },
            {
                pins: [10, 9, 1],
                score: (10 + 9 + 1) + 9 + 1
            },
            {
                pins: [1, 9, 3, 2],
                score: (1 + 9 + 3) + (3 + 2)
            },
            {
                pins: [0, 0],
                score: 0
            }
        ];

        mocks.forEach(function (data) {
            makeTest(data.pins, data.score);
        });
    });

    suite('#getAvailablePins()', function () {
        function makeTest(pins, expected) {
            var result = gameService.getAvailablePins(pins);
            test('should be ' + expected + ', if pins are ' + pins.join(', '), function () {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {pins: [1], available: 9},
            {pins: [1, 9], available: 10},
            {pins: [10, 9], available: 1},
            {pins: [10, 10], available: 0},
            {pins: [0, 10], available: 10},
            {pins: [5, 5, 5], available: 5},
            {pins: [5, 5, 0], available: 10}
        ];
        mocks.forEach(function (data) {
            makeTest(data.pins, data.available);
        });
    });

    suite('#getMaxScore()', function () {

        function getScore (acc, player) {
            acc.push(player.score.join(', '));
            return acc;
        }
        
        function makeTest(players, expected) {
            var result = gameService.getMaxScore(players);
            var score = players.reduce(getScore, []);
            test('should be ' + expected + ', if players are [' + score.join('], [ ') + ']', function () {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {players: [{score: [0, 1, 3]}, {score: [4, 5, 6]}], maxScore: 15},
            {players: [{score: [10, 11, 3]}], maxScore: 24},
            {players: [{score: [1, 3]}, {score: [4, 6]}, {score: [14, 6]}], maxScore: 20},
        ];
        mocks.forEach(function (data) {
            makeTest(data.players, data.maxScore);
        });
    });

    suite('#isOver()', function () {
        function makeTest(pins, expected) {
            var result = gameService.isOver(pins);
            test('should be ' + expected + ', if pins are ' + pins.join(', '), function () {
                assert.equal(result, expected);
            });
        }

        var mocks = [
            {pins: [1, 7], isOver: true},
            {pins: [7], isOver: false},

            {pins: [1, 9, 4, 6], isOver: true},
            {pins: [5, 5, 10], isOver: true},
            {pins: [1, 9, 6], isOver: false},

            {pins: [10, 10], isOver: true},
            {pins: [10, 1], isOver: false},
            {pins: [10, 1, 2], isOver: true}
        ];
        mocks.forEach(function (data) {
            makeTest(data.pins, data.isOver);
        });
    });

    suite('#isStrike()', function () {
        function makeTest(pins, expected) {
            var result = gameService.isStrike(pins);
            test('should be ' + expected + ' if the player knocks down all 10 pins on the first roll, ' +
                'where the rolls are ' + pins, function () {
                assert.equal(expected, result);
            });
        }

        [[10, 0], [10], [3], [3, 4]].forEach(function (pins) {
            makeTest(pins, pins[0] === 10);
        });
    });

    suite('#isSpare()', function () {
        function makeTest(pins, expected) {
            var result = gameService.isSpare(pins);
            test('should be ' + expected + ' if the player knocks down all 10 pins in two rolls, ' +
                'where the rolls are ' + pins, function () {
                assert.equal(expected, result);
            });
        }

        var mocks = [
            {pins: [3, 3], isSpare: false},
            {pins: [3, 7], isSpare: true},
            {pins: [10, 10], isSpare: false},
            {pins: [0, 10], isSpare: true},
            {pins: [5], isSpare: false}
        ];
        mocks.forEach(function (data) {
            makeTest(data.pins, data.isSpare);
        });
    });

    suite('#isLastFrame()', function () {
        function makeTest(frame, expected) {
            var result = gameService.isLastFrame(frame);
            test('should be ' + expected + ' for frame number ' + frame, function () {
                assert.equal(expected, result);
            });
        }

        [3, 5, 9, 12].forEach(function (frame) {
            makeTest(frame, frame === 9);
        });
    });

    suite('#countArray()', function () {
        function makeTest(array, expected) {
            var result = gameService.countArray(array);
            test('should be ' + expected + ' for [' + array.join(', ') + ']', function () {
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

        mocks.forEach(function (data) {
            makeTest(data.array, data.expected);
        });
    });
});
