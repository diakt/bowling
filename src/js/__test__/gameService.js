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

    suite('#isOver()', function () {
        function makeTest(pins, expected) {
            var result = gameService.isOver(pins);
            test('should be ' + expected + ', if pins are ' + pins.join(', '), function () {
                assert.equal(result, expected);
            });
        }

        [
            [1, false],
            [3, 6, true],
            [4, 6, false],
            [4, 6, 7, true],
            [10, 6, false],
            [10, 6, 8, true]
        ].forEach(function (data) {
                var expected = data.pop();
                makeTest(data, expected);
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

        [[3, 3], [3, 7], [3, 0], [0, 10]].forEach(function (pins) {
            makeTest(pins, pins[1] + pins[0] === 10);
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
});
