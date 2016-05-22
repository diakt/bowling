Object.assign(app, (function (actions, dispatcher, store, component) {

    var controlComponent = Object.create(component);

    Object.assign(controlComponent, {

        routeEvents: function (e) {
            switch (e.target.className) {
                case 'roll-random':
                    dispatcher.dispatch(actions.roll());
                    break;

                case 'roll-value':
                    var value = Number(e.target.getAttribute('data-value'));
                    dispatcher.dispatch(actions.roll(value));
                    break;

                case 'control-add-player':
                    dispatcher.dispatch(actions.addPlayer());
                    break;

                case 'start':
                    dispatcher.dispatch(actions.start());
                    break;
            }
        },

        addButtons: function (max) {
            var buttonContainer = this.createElement('buttons-container');
            for (var i = 0; i < max; i++) {
                buttonContainer.appendChild(this.createElement({
                    tag: 'button',
                    'data-value': i + 1,
                    'class': 'roll-value',
                    text: i + 1
                }))
            }

            this.element.appendChild(buttonContainer);
        },

        render: function (state) {
            state || (state = store.state);

            this.removeChildNodes();

            if (!state.isOn) {
                this.element.appendChild(this.createElement({
                    tag: 'button',
                    class: 'control-add-player',
                    text: 'Add player'
                }));

                if (state.players.length) {
                    this.element.appendChild(this.createElement({
                        tag: 'button',
                        class: 'start',
                        text: 'Start!'
                    }));
                }
            }

            if (state.players.length && !state.isOver && state.isOn) {
                this.element.appendChild(this.createElement({
                    tag: 'button',
                    'class': 'roll-random',
                    text: 'ROLL!'
                }));

                var last = state.current.pins[state.current.pins.length - 1];
                var max = (10 - last) || 10;
                this.addButtons(max);
            }
        },

        init: function (options) {
            this.element = options.element;
            this.element.addEventListener('click', this.routeEvents.bind(this));
            store.onChange(this.render.bind(this));
            this.render();
        }
    });

    return {
        controlComponent: controlComponent
    };

})(app.actions, app.dispatcher, app.store, app.abstractComponent));
