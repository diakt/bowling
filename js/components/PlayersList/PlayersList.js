import appStore from 'store/appStore'
import {Player, AbstractComponent} from 'components'
import {elementTpl} from './playersListTpl'

export default class PlayersList extends AbstractComponent {

    static tpl() {
        return elementTpl();
    }

    constructor(options) {
        super();
        this.element = options.element;
        this.render();
    }

    render() {
        const state = appStore.state;
        var children = [];

        state.players.forEach((playerState, i) => {
            children.push({Class: Player, options: {id: i}});
        });

        this.update(children);
    }
}
