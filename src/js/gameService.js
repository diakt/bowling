var main = main || {};

main.pinService = {

    // returns random number from 0 to 10
    roll: function () {
        return Math.floor(Math.random() * (10 - 1)) + 1;
    },

    isStrike: function (score) {
        return score === 10;
    },

    isSpare: function (pins, isStrike) {
        isStrike && pins.shift();

        if (!pins) {
            return false;
        }

        var summ = pins.reduce(function (acc, score) {
            acc += score;
            return acc;
        }, 0);

        return summ === 10;
    },

    isLastFrame: function (frame) {
        return frame === 10;
    },

    getWinner: function (players) {
        return 0;
    }
};
