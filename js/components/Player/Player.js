import appStore from 'store/appStore'
import {AbstractComponent} from 'components'
import {countArray} from 'utils/functions'
import {elementTpl, childrenTpl} from './playerTpl'

export default class Player extends AbstractComponent {

    static tpl() {
        return elementTpl();
    }

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
     * Manages score like in the Ten-pin bowling scoreboard
     * @see https://en.wikipedia.org/wiki/Ten-pin_bowling
     */
    prepareProps(state) {
        var player = state.players[this.id];

        // Iterates over the pins to specify data for template
        var frames = player.pins.reduce((framesAcc, pins, i) => {
            if (pins.length === 0) {
                return framesAcc;
            }

            // Clones array from store
            pins = pins.slice(0);

            let previousScore = countArray(player.score.slice(0, i + 1));
            let isStrike = player.strikes[i];
            let isSpare = player.spares[i];
            let score = [];
            let rest;

            // Operates with score
            if (isStrike) {
                score.push('X');
            } else if (isSpare) {
                score.push('/');
                pins.shift();
                pins.shift();
                rest = countArray(pins);
            } else if (pins[0] === 0) {
                score.push('–');
                rest = countArray(pins);
            } else {
                score.push(pins[0]);
                pins.shift();
                rest = countArray(pins || []);
            }

            if (rest) {
                score.push(rest);
            }

            framesAcc.push({score, previousScore});

            return framesAcc;
        }, []);
        
        return {id: this.id + 1, frames};
    }

    /**
     * Manages className for the root element
     * @param {Object} state
     */
    prepareClassName(state) {
        var className = '';
        var player = state.players[this.id];

        if (!state.isOver) {
            if (player.exit) {
                className += ' exit';
            }
            if (this.id === state.current.player) {
                className += ' current';
            }
        }

        if (player.isWinner) {
            className += ' winner';
        }

        return className;
    }

    render () {
        const state = appStore.state;
        const props = this.prepareProps(state);
        const className = this.prepareClassName(state);

        this.update(className, childrenTpl(props));
    }
}
