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

        activeId: 0,
        players: [
            {
                score: 0,
                pins: [[]],
                isOver: false
            },
            {
                score: 0,
                pins: [[]],
                isOver: false
            }
        ]
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
        }
    });

    store.appToken = dispatcher.register(function (action) {
        var state = Object.assign({}, store.state);

        switch (action.type) {
            case actionTypes.ROLL:
                if (state.isOver) {
                    return;
                }

                var score = gameService.roll(state.current.pins);

                // set current frame score
                state.current.score = score;
                state.current.pins.push(score);

                // set score to active player
                state.players[state.activeId].score += score;

                var pins = state.players[state.activeId].pins;
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
                    state.players[state.activeId].pins.push([]);
                    state.activeId++;

                    if (state.activeId > state.players.length - 1) {
                        state.frame++;
                        state.isLast = gameService.isLastFrame(state.frame);
                        if (state.isLast) {
                            state.isOver = true;
                        } else {
                            state.activeId = 0;
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