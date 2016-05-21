Object.assign(app, (function (events, dispatcher, actionTypes, actions, gameService) {

    var initialState = {

        frame: 0,

        isLast: false,
        isOver: false,

        current: {
            score: 0,
            pins: [],
            isStrike: false,
            isSpare: false
        },

        activePlayer: null,
        players: []
    };

    var playerState = {
        score: 0,
        pins: [[]],
        isOver: false
    };

    var store = Object.create(events);

    // inherits event emitter
    Object.assign(store, {
        state: initialState,
        lastState: {},

        update: function (state) {
            this.lastState = Object.assign({}, this.state);
            this.state = Object.assign({}, this.state, state);
            this.emit('store.change');
        },

        onChange: function (fn) {
            this.on('store.change', function () {
                fn(this.state, this.lastState);
            }.bind(this));
        },

        addPlayer: function () {
            Object.assign({}, this.state, {
                players: this.state.players.push(Object.create(playerState))
            });

            // set active player when first one is added
            if (this.state.players.length === 1) {
                this.state.activePlayer = 0;
            }

            return this;
        }
    });

    store.appToken = dispatcher.register(function (action) {
        var state = Object.assign({}, store.state);

        switch (action.type) {
            case actionTypes.ADD_PLAYER:
                store.addPlayer().update();
                break;

            case actionTypes.ROLL:
                if (state.isOver) {
                    return;
                }

                var score = gameService.roll(state.current.pins);

                // set current frame score
                state.current.score = score;
                state.current.pins.push(score);

                // set score to active player
                state.players[state.activePlayer].score += score;

                var pins = state.players[state.activePlayer].pins;
                pins[pins.length - 1].push(score);

                // set special achievements
                state.current.isStrike = gameService.isStrike(state.current.pins);
                state.current.isSpare = gameService.isSpare(state.current.pins);

                // update view
                store.update(state);

                // update the game state
                var isOver = gameService.isOver(state.current.pins);

                if (isOver) {
                    state.current.pins = [];
                    state.players[state.activePlayer].pins.push([]);
                    state.activePlayer++;

                    if (state.activePlayer > state.players.length - 1) {
                        state.frame++;
                        state.isLast = gameService.isLastFrame(state.frame);
                        if (state.isLast) {
                            state.isOver = true;
                        } else {
                            state.activePlayer = 0;
                        }
                    }
                    store.update(state);
                }

                break;

            case actionTypes.END_GAME:
                state.isOver = true;
                store.update(state);
                break;
        }
    });

    return {
        store: store
    };
}(
    app.lib.events,
    app.dispatcher,
    app.actionTypes,
    app.actions,
    app.gameService
)));
