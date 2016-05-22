Object.assign(app, (function (store, component) {

    var playerComponent = Object.create(component);

    Object.assign(playerComponent, {

        countRest: function (pins) {
            return pins.reduce(function (acc, score) {
                acc += score;
                return acc;
            }, 0);
        },

        render: function (state) {
            state || (state = store.state);

            var nameElement = this.createElement('name', 'Player ' + (this.id + 1) + ': ');
            var framesElement = this.createElement('frames');
            var player = state.players[this.id];
            this.removeChildNodes();

            player.pins.forEach(function (pins, i) {
                if (pins.length === 0) {
                    return;
                }

                pins = pins.slice(0);

                var frameElement = this.createElement('frame');
                var previousScore = this.countRest(player.score.slice(0, i + 1));
                var isStrike = player.strikes[i];
                var isSpare = player.spares[i];
                var rest;

                if (isStrike) {
                    frameElement.appendChild(this.createElement('score', 'X'));
                } else if (isSpare) {
                    frameElement.appendChild(this.createElement('score', '/'));
                    pins.shift();
                    pins.shift();
                    rest = this.countRest(pins);
                } else if (pins[0] === 0) {
                    frameElement.appendChild(this.createElement('score', '–'));
                    rest = this.countRest(pins);
                } else {
                    frameElement.appendChild(this.createElement('score', pins[0]));
                    pins.shift();
                    rest = this.countRest(pins || []);
                }

                if (rest) {
                    frameElement.appendChild(this.createElement('score', rest));
                }

                frameElement.appendChild(this.createElement('frame-score', previousScore));
                framesElement.appendChild(frameElement);

            }.bind(this));

            this.element.appendChild(nameElement);
            this.element.appendChild(framesElement);

            if (player.exit) {
                this.element.className += ' exit';
            } else if (this.id === state.activePlayer) {
                this.element.className += ' active';
            }
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
