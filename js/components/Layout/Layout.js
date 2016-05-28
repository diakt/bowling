import {AbstractComponent, PlayersList, Control} from 'components'
import appStore from 'store/appStore'
import {welcomeTpl} from './layoutTpl'

export default class Layout extends AbstractComponent {
    constructor(options) {
        super();
        this.element = options.element;
        this.render();
        appStore.onChange(this.render.bind(this));
    }

    render() {
        const state = appStore.state;
        var children = [];

        if (!state.players.length) {
            children.push(welcomeTpl());
        } else {
            children.push(PlayersList);
        }

        children.push(Control);

        this.update(children);
    }
};
