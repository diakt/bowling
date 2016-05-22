Object.assign(app, (function () {

    var gameService = {

        // Returns random number from 0 to 10, tends to maximum on the first attempt
        roll: function (pins) {
            var last = pins[pins.length - 1];
            var max = (10 - last) || 10;
            var score;
            var accuracy = max === 10 ? Math.floor(Math.random() * (4 - 1)) + 1 : 4;

            switch (accuracy) {

                // On the first roll Player has the best chance for Strike
                case 1:
                    score = Math.floor(Math.random() * (11 - 8)) + 8;
                    break;
                case 2:
                    score = Math.floor(Math.random() * (8 - 5)) + 5;
                    break;
                case 3:
                    score = Math.floor(Math.random() * (6 - 1)) + 1;
                    break;

                // Second roll is a bit difficult, a chance to get Spare mostly depends on Player's fortune
                case 4:
                    score = Math.floor(Math.random() * max);
                    break;
            }

            return score;
        },

        activePlayer: function (pins, activePlayer, playersLen) {
            if (this.isOver(pins)) {
                if (activePlayer === playersLen - 1) {
                    activePlayer = 0;
                } else {
                    activePlayer++;
                }
            }
            return activePlayer;
        },

        countScore: function (pins) {
            var score;

            if (this.isStrike(pins)) {
                score = this.countArray(pins) + this.countArray(pins.slice(1));
            } else if (this.isSpare(pins)) {
                score = this.countArray(pins) + pins[2];
            } else {
                score = this.countArray(pins);
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
        },

        countArray: function (array) {
            return array.reduce(function (sum, num) {
                sum += num;
                return sum;
            }, 0);
        }
    };

    return {
        gameService: gameService
    }
})());

