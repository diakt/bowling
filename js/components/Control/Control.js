import {addPlayer, roll, start} from 'actions/ActionCreators'
import dispatcher from 'dispatcher/appDispatcher'
import appStore from 'store/appStore'
import {AbstractComponent} from 'components'
import {elementTpl, addPlayerTpl, startTpl, buttonsTpl} from './controlTpl'

export default class Control extends AbstractComponent {

    static tpl() {
        return elementTpl();
    }

    /**
     * Sets the root element and subscribes on updates from Store
     * @param {Object} options
     */
    constructor(options) {
        super();
        this.element = options.element;
        this.render();
        this.element.addEventListener('click', this.bindEvents.bind(this));
    }

    /**
     * Handles clicks on child elements
     * @param {Object} e - Native DOM Click
     */
    bindEvents(e) {
        switch (e.target.getAttribute('data-click')) {
            case 'roll-random':
                dispatcher.dispatch(roll());
                break;

            case 'roll-value':
                var value = Number(e.target.getAttribute('data-value'));
                dispatcher.dispatch(roll(value));
                break;

            case 'add-player':
                dispatcher.dispatch(addPlayer());
                break;

            case 'start':
                dispatcher.dispatch(start());
                break;
        }
    }

    prepareProps(state) {
        var props = {};
        props.available = state.current.available;
        return props;
    }

    render() {
        const state = appStore.state;
        const props = this.prepareProps(state);
        var children = [];

        if (!state.isOn && !state.isOver) {
            children.push(addPlayerTpl());

            if (state.players.length) {
                children.push(startTpl());
            }
        }

        if (state.players.length && !state.isOver && state.isOn) {
            children.push(buttonsTpl(props));
        }

        this.update(children);
    }
}
