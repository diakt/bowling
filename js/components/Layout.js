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
        this.removeChildNodes();

        var scoreboard = this.createElement({
            id: 'players-list',
            'class': 'scoreboard'
        });

        scoreboard.appendChild(this.createElement('welcome', 'Please, add new Player'));

        this.element.appendChild(scoreboard);
        this.element.appendChild(this.createElement({
            'class': 'controls',
            id: 'controls'
        }));

        new PlayersList({
            element: document.querySelector('#players-list')
        });

        new Control({
            element: document.querySelector('#controls')
        });
    }
};
