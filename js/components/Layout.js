import AbstractComponent from './Abstract'
import PlayersList from './PlayersList'
import Control from './Control'
import appStore from '../store/appStore'

export default class Layout extends AbstractComponent {
    constructor(options) {
        super();
        this.element = options.element;
        this.render();
        appStore.onChange(this.render.bind(this));
    }

    render() {
        var state = appStore.state;

        this.removeChildNodes();

        if (!state.players.length) {
            this.element.appendChild(this.createElement('welcome', 'Please add new player'));
        } else {
            this.element.appendChild(this.createElement({
                id: 'players-list',
                'class': 'scoreboard'
            }));
            
            new PlayersList({
                element: document.querySelector('#players-list')
            });
        }

        this.element.appendChild(this.createElement({
            'class': 'controls',
            id: 'controls'
        }));

        new Control({
            element: document.querySelector('#controls')
        });
    }
};
