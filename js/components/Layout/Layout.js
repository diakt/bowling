import appStore from 'store/appStore'
import {AbstractComponent, PlayersList, Control} from 'components'
import {elementTpl, welcomeTpl, isOverTpl, frameNumberTpl} from './layoutTpl'

export default class Layout extends AbstractComponent {

    static tpl(){
        return elementTpl();
    }

    constructor(options) {
        super();
        this.element = options.element;
        this.render();
    }

    prepareProps(state) {
        var props = {};

        if (state.frame + 1) {
            props.text = 'Current frame: ' + (state.frame + 1);
        } else {
            props.text = 'Waiting for the first roll'
        }

        return props;
    }

    render() {
        const state = appStore.state;
        const props = this.prepareProps(state);
        var children = [];

        if (!state.players.length) {
            children.push(welcomeTpl());
        } else {

            if (state.isOver) {
                children.push(isOverTpl());
            } else if (state.current.player !== null) {
                children.push(frameNumberTpl(props));
            }

            children.push(PlayersList);
        }

        children.push(Control);

        this.update(children);
    }
};
