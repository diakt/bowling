import {countArray} from 'utils/functions'

export default class Game {

    /**
     * Returns random number from 0 to 10, tends to maximum on the first roll
     * @param {Number[]} pins
     * @returns {Number}
     */
    static roll(pins) {
        var max = Game.getAvailablePins(pins);
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
                score = Math.floor(Math.random() * 6);
                break;

            // Second roll is a bit difficult, a chance to get Spare mostly depends on Player's fortune
            case 4:
                score = Math.floor(Math.random() * max);
                break;
        }

        return score;
    }

    /**
     * Counts points in a single frame depending on possible bonus points for strike/spare
     * @param {Number[]} pins
     * @returns {Number}
     */
    static countScore(pins) {
        var score;

        if (this.isStrike(pins)) {
            score = countArray(pins) + countArray(pins.slice(1));
        } else if (this.isSpare(pins)) {
            score = countArray(pins) + (pins[2] ? pins[2] : 0);
        } else {
            score = countArray(pins);
        }

        return score;
    }

    /**
     * Counts number of available pins after previous roll depending on strike/spare
     * @param {Number[]} pins
     * @returns {Number}
     */
    static getAvailablePins(pins) {
        var available = 10;

        if (pins.length) {
            if (Game.isStrike(pins)) {
                available = 10 - (pins[1] ? pins[1] : 0);
            } else if (Game.isSpare(pins)) {
                available = 10 - (pins[2] ? pins[2] : 0);
            } else {
                available = 10 - (pins[0] ? pins[0] : 0);
            }
        }

        return available;
    }

    /**
     * Returns maximum number of points after comparing each player's score
     * @param {Object[]} players
     * @returns {Number}
     */
    static getMaxScore(players) {
        var score = [];
        players.forEach((player) => {
            score.push(countArray(player.score));
        });

        return Math.max.apply(Math, score);
    }

    /**
     * Defines if the turn of current active player is over
     * @param {Number[]} pins
     * @returns {Boolean}
     */
    static isOver(pins) {
        var max;

        if (Game.isStrike(pins)) {
            max = pins[1] === 10 ? 2 : 3;
        } else if (Game.isSpare(pins)) {
            max = pins[2] === 10 ? 3 : 4;
        } else {
            max = 2;
        }

        return pins.length === max;
    }

    /**
     * Defines if the player knocks down all 10 pins on the first roll
     * @param {Number[]} pins
     * @returns {Boolean}
     */
    static isStrike(pins) {
        return pins[0] === 10;
    }

    /**
     * Defines if the player knocks down all 10 pins in two rolls
     * @param {Number[]} pins
     * @returns {Boolean}
     */
    static isSpare(pins) {
        return pins[0] + pins[1] >= 10 && pins[0] !== 10;
    }

    /**
     * Defines how many frames are available in the game
     * @param {Number} frame
     * @returns {Boolean}
     */
    static isLastFrame(frame) {
        // counts from 0
        return frame === 9;
    }
}
