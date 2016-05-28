import appStore from 'store/appStore'
import {Player, AbstractComponent} from 'components'
import {elementTpl, isOverTpl, frameNumberTpl} from './playersListTpl'

export default class PlayersList extends AbstractComponent {

    static tpl() {
        return elementTpl();
    }

    constructor(options) {
        super();
        this.element = options.element;
        this.render();
    }

    prepareText(state) {
        var text;
        if (state.frame + 1) {
            text = 'Current frame: ' + (state.frame + 1);
        } else {
            text = 'Waiting for the first roll'
        }
        return text;
    }

    render() {
        const state = appStore.state;
        var children = [];

        if (state.isOver) {
            children.push(isOverTpl());
        } else if (state.current.player !== null) {
            let text = this.prepareText(state);
            children.push(frameNumberTpl({text}));
        }

        state.players.forEach((playerState, i) => {
            children.push({Class: Player, options: {id: i}});
        });

        this.update(children);
    }
}
