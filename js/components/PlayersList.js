import store from '../store/Store'
import Player from './Player'
import AbstractComponent from './Abstract'

export default class PlayersList extends AbstractComponent {
    /**
     * Sets the root element and subscribes on updates from Store
     * @param {Object} options
     * @param {HTMLElement} options.element
     */
    constructor (options) {
        this.element = options.element;
        store.onChange(this.render.bind(this));
    }

    /**
     * Instantiates new playerComponent and inserts it into the DOM
     * @param {Object} [playerState]
     * @param {Number} i - player id
     */
    addPlayer (playerState, i) {
        var player = this.createElement('player');
        this.element.appendChild(player);

        new Player({
            id: i,
            element: player
        });
    }

    /**
     * Renders children elements
     * @param {Object} [state]
     */
    render (state) {
        state || (state = store.state);

        this.removeChildNodes();
        if (state.isOver) {
            this.element.appendChild(this.createElement({
                'class': 'is-over',
                text: 'The game is over'
            }));
        } else if (state.activePlayer !== null) {
            var text;
            if (state.frame + 1) {
                text = 'Current frame: ' + (state.frame + 1);
            } else {
                text = 'Waiting for the first roll'
            }
            this.element.appendChild(this.createElement({
                'class': 'frame-number',
                text: text
            }));
        }

        state.players.forEach(this.addPlayer.bind(this));
    }
}
