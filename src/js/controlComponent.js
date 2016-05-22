Object.assign(app, (function (actions, dispatcher, store, component) {

    var controlComponent = Object.create(component);

    Object.assign(controlComponent, {
        render: function (state) {
            state || (state = store.state);

            this.removeChildNodes();

            this.element.appendChild(this.createElement({
                tag: 'button',
                id: 'control-add-player',
                text: 'Add player'
            }));

            if (state.players.length) {
                this.element.appendChild(this.createElement({
                    tag: 'button',
                    'class': 'roll',
                    id: 'control-roll',
                    text: 'ROLL!'
                }));
            }
        },

        routeEvents: function (e) {
            switch (e.target.id) {
                case 'control-roll':
                    dispatcher.dispatch(actions.roll());
                    break;

                case 'control-add-player':
                    dispatcher.dispatch(actions.addPlayer());
                    break;
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
