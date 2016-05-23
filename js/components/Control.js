import {addPlayer, roll, start } from '../actions/ActionCreators'
import dispatcher from '../dispatcher/appDispatcher'
import appStore from '../store/appStore'
import AbstractComponent from './Abstract'

export default class Control extends AbstractComponent {

    /**
     * Sets the root element and subscribes on updates from Store
     * @param {Object} options
     */
    constructor (options) {
        super();
        this.element = options.element;
        this.render();
        this.element.addEventListener('click', this.routeEvents.bind(this));
    }
    
    /**
     * Handles clicks on child elements
     * @param {Object} e - Native DOM Click
     */
    routeEvents (e) {
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

    /**
     * Prints Buttons knocking exact number of pins depending on available pins
     * after previous roll
     *
     * @param {Number} available - available pins in current roll
     */
    addButtons (available) {
        var buttonContainer = this.createElement('buttons-container');

        for (var i = 0; i < available; i++) {
            buttonContainer.appendChild(this.createElement({
                tag: 'button',
                'data-value': i + 1,
                'class': 'roll-value',
                text: i + 1
            }))
        }

        this.element.appendChild(buttonContainer);
    }

    /**
     * Renders children elements
     */
    render () {
        var state = appStore.state;

        this.removeChildNodes();

        if (!state.isOn && !state.isOver) {
            this.element.appendChild(this.createElement({
                tag: 'button',
                class: 'control-add-player',
                text: 'Add player'
            }));

            if (state.players.length) {
                this.element.appendChild(this.createElement({
                    tag: 'button',
                    class: 'start',
                    text: 'Start'
                }));
            }
        }

        if (state.players.length && !state.isOver && state.isOn) {
            this.element.appendChild(this.createElement({
                tag: 'button',
                'class': 'roll-random',
                text: 'Random ROLL!'
            }));

            this.addButtons(state.current.available);
        }
    }
}
