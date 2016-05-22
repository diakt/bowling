Object.assign(app, (function () {

    var gameService = {

        // Returns random number from 0 to 10, tends to maximum on the first attempt
        roll: function (pins) {
            var max = this.getAvailablePins(pins);
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

        getAvailablePins: function (pins) {
            var available = 10;

            if (pins.length) {
                if (this.isStrike(pins)) {
                    available = 10 - (pins[1] ? pins[1] : 0);
                } else if (this.isSpare(pins)) {
                    available = 10 - (pins[2] ? pins[2] : 0);
                } else {
                    available = 10 - (pins[0] ? pins[0] : 0);
                }
            }

            return available;
        },

        isOver: function (pins) {
            var max;

            if (this.isStrike(pins)) {
                max = pins[1] === 10 ? 2 : 3;
            } else if (this.isSpare(pins)) {
                max = pins[2] === 10 ? 3 : 4;
            } else {
                max = 2;
            }

            return pins.length === max;
        },

        isStrike: function (pins) {
            return pins[0] === 10;
        },

        isSpare: function (pins) {
            return pins[0] + pins[1] >= 10 && pins[0] !== 10;
        },

        isLastFrame: function (frame) {
            // counts from 0
            return frame === 9;
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

