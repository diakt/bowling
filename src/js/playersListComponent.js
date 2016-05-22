Object.assign(app, (function (store, playerComponent, component) {

    var playersListComponent = Object.create(component);

    Object.assign(playersListComponent, {
        render: function (state) {
            state || (state = store.state);

            this.removeChildNodes();

            // prints all previous frames
            state.players.forEach(this.addPlayer.bind(this));

            if (state.isOver) {
                this.element.className += ' is-over';
            }
        },

        addPlayer: function (playerState, i) {
            var player = this.createElement('player');
            this.element.appendChild(player);

            playerComponent.init({
                id: i,
                element: player
            });
        },

        init: function (options) {
            this.element = options.element;
            store.onChange(this.render.bind(this));
        }
    });

    return {
        playersListComponent: playersListComponent
    }

})(app.store, app.playerComponent, app.abstractComponent));
