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

            this.removeChildNodes();

            state.players[this.id].pins.forEach(function (pins, i) {
                if (pins.length === 0) {
                    return;
                }

                pins = pins.slice(0);

                var frameElement = this.createElement('frame');
                var previousScore = this.countRest(state.players[this.id].score.slice(0, i + 1));
                var isStrike = state.players[this.id].strikes[i];
                var isSpare = state.players[this.id].spares[i];
                var rest;

                if (isStrike) {
                    frameElement.appendChild(this.createElement('score', 'X'));
                } else if (isSpare) {
                    frameElement.appendChild(this.createElement('score', '/'));
                    rest = pins.pop();
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
