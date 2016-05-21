Object.assign(app, (function (store, playerComponent, component) {

    var playersListComponent = Object.create(component);

    Object.assign(playersListComponent, {
        render: function (state) {
            state || (state = store.state);

            this.removeChildNodes();

            // prints all previous frames
            state.players.forEach(this.addPlayer.bind(this));
        },

        addPlayer: function (playerState, i) {
            var player = this.createElement('player');

            if (playerState.isOver) {
                player.className += ' is-over';
            }

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

})(app.store, app.playerComponent, app.lib.component));
