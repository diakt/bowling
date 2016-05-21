Object.assign(app, (function () {

    var gameService = {

        // Returns random number from 0 to 10, tends to maximum on the first attempt
        roll: function (pins) {
            var last = pins[pins.length - 1];
            var max = (10 - last) || 10;
            var score;
            var accuracy = max === 10 ? Math.floor(Math.random() * (4 - 1)) + 1 : 4;

            switch (accuracy) {

                // On the first attempt Player has the best chance for Strike
                case 1:
                    score = Math.floor(Math.random() * (11 - 8)) + 8;
                    break;
                case 2:
                    score = Math.floor(Math.random() * (8 - 5)) + 5;
                    break;
                case 3:
                    score = Math.floor(Math.random() * (6 - 1)) + 1;
                    break;

                // Second attempt is a bit difficult, a chance to get Spare mostly depends on Player's fortune
                case 4:
                    score = Math.floor(Math.random() * max);
                    break;
            }

            return score;
        },

        isOver: function (pins) {
            var max = this.isStrike(pins) || this.isSpare(pins) ? 3 : 2;
            return pins.length === max;
        },

        isStrike: function (pins) {
            return pins[0] === 10;
        },

        isSpare: function (pins) {
            return pins[0] + pins[1] >= 10 && pins[0] !== 10;
        },

        isLastFrame: function (frame) {
            return frame === 10;
        }
    };

    return {
        gameService: gameService
    }
})());

