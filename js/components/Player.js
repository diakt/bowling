import appStore from '../store/appStore'
import AbstractComponent from './Abstract'
import {countArray} from '../utils/functions'

export default class Player extends AbstractComponent {
    /**
     * Sets the root element and subscribes on updates from Store
     * @param {Object} options
     * @param {HTMLElement} options.element
     * @param {Number} options.id - player id
     */
    constructor (options) {
        super();
        this.id = options.id;
        this.element = options.element;
        this.render();
    }

    /**
     * Renders children elements
     * prints score like in Ten-pin bowling scoreboard
     * @see https://en.wikipedia.org/wiki/Ten-pin_bowling
     */
    render () {
        var state = appStore.state;

        // Player name
        var nameElement = this.createElement('name', 'Player ' + (this.id + 1) + ': ');

        // Frames container
        var framesElement = this.createElement('frames');
        var player = state.players[this.id];

        this.removeChildNodes();

        // Iterates over the pins in order to render every frame
        player.pins.forEach((pins, i) => {
            if (pins.length === 0) {
                return;
            }

            // Clones array from store
            pins = pins.slice(0);

            var frameElement = this.createElement('frame');
            var previousScore = countArray(player.score.slice(0, i + 1));
            var isStrike = player.strikes[i];
            var isSpare = player.spares[i];
            var rest;

            // Operates with score in
            if (isStrike) {
                frameElement.appendChild(this.createElement('score', 'X'));
            } else if (isSpare) {
                frameElement.appendChild(this.createElement('score', '/'));
                pins.shift();
                pins.shift();
                rest = countArray(pins);
            } else if (pins[0] === 0) {
                frameElement.appendChild(this.createElement('score', '–'));
                rest = countArray(pins);
            } else {
                frameElement.appendChild(this.createElement('score', pins[0]));
                pins.shift();
                rest = countArray(pins || []);
            }

            if (rest) {
                frameElement.appendChild(this.createElement('score', rest));
            }

            frameElement.appendChild(this.createElement('frame-score', previousScore));
            framesElement.appendChild(frameElement);

        });

        this.element.appendChild(nameElement);
        this.element.appendChild(framesElement);

        if (!state.isOver) {
            if (player.exit) {
                this.element.className += ' exit';
            }
            if (this.id === state.current.player) {
                this.element.className += ' current';
            }
        }

        if (player.isWinner) {
            this.element.className += ' winner';
        }
    }
}
