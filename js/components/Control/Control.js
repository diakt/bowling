import {addPlayer, roll, start} from 'actions/ActionCreators'
import dispatcher from 'dispatcher/appDispatcher'
import appStore from 'store/appStore'
import {AbstractComponent} from 'components'
import {elementTpl, addPlayerTpl, startTpl, rollTpl, childrenTpl} from './controlTpl'

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
        this.element.addEventListener('click', this.routeEvents.bind(this));
    }

    /**
     * Handles clicks on child elements
     * @param {Object} e - Native DOM Click
     */
    routeEvents(e) {
        switch (e.target.className) {
            case 'roll-random':
                dispatcher.dispatch(roll());
                break;

            case 'roll-value':
                var value = Number(e.target.getAttribute('data-value'));
                dispatcher.dispatch(roll(value));
                break;

            case 'control-add-player':
                dispatcher.dispatch(addPlayer());
                break;

            case 'start':
                dispatcher.dispatch(start());
                break;
        }
    }

    prepareButtons(state){
        var props = {};

        if (!state.isOn && !state.isOver) {
            props.addPlayer = true;

            if (state.players.length) {
                props.start = true;
            }
        }

        if (state.players.length && !state.isOver && state.isOn) {
            props.available = state.current.available;
        }

        return props;
    }

    render() {
        const state = appStore.state;
        const props = this.prepareButtons(state);

        this.update(childrenTpl(props));
    }
}
