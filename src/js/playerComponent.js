Object.assign(app, (function (store, component) {

    var playerComponent = Object.create(component);

    Object.assign(playerComponent, {

        render: function (state) {
            state || (state = store.state);

            var nameElement = this.createElement('name', 'Player ' + this.id + ': ');
            var scoreElement = this.createElement('score', state.players[this.id].score);
            var pinsElement = this.createElement('pins');

            this.removeChildNodes();

            state.players[this.id].pins.forEach(function (score) {
                pinsElement.appendChild(this.createElement('pin', score.join(', ')));
            }.bind(this));

            this.element.appendChild(nameElement);
            this.element.appendChild(pinsElement);
            this.element.appendChild(scoreElement);
        },

        init: function (options) {
            this.id = options.id;
            this.element = options.element;
            store.onChange(this.render.bind(this));
            this.render();
            return this;
        }
    });

    return {
        playerComponent: playerComponent
    }

})(app.store, app.abstractComponent));
