Object.assign(app, (function (eventEmitter, dispatcher, actionTypes, actions, gameService) {

    var initialState = {
        frame: -1,

        isLast: false,
        isOver: false,
        isOn: false,

        current: {
            score: 0,
            pins: []
        },

        activePlayer: null,
        players: []
    };

    // inherits event emitter
    var store = Object.create(eventEmitter);

    Object.assign(store, {
        state: initialState,

        update: function (state) {
            this.state = Object.assign(this.state, state);
            this.emit('store.change');
        },

        onChange: function (fn) {
            this.on('store.change', function () {
                fn(this.state);
            }.bind(this));
        },

        addPlayer: function (state) {
            state.players.push({
                pins: [[]],
                strikes: [],
                spares: [],
                score: [],
                exit: false
            });

            // set active player when first one is added
            if (state.players.length === 1) {
                state.activePlayer = 0;
            }

            return state;
        },

        updateFrame: function (state) {
            var score = state.current.score;

            // player's personal frame
            var frame = state.players[state.activePlayer].pins.length - 1;

            state.players[state.activePlayer].pins[frame].push(score);
            state.players[state.activePlayer].score[frame] = gameService.countScore(state.current.pins);
            state.players[state.activePlayer].strikes[frame] = gameService.isStrike(state.current.pins);
            state.players[state.activePlayer].spares[frame] = gameService.isSpare(state.current.pins);

            var isCurrentOver = gameService.isOver(state.current.pins);
            var isLastFrame = gameService.isLastFrame(state.frame);

            // manages next frame and next player
            if (isCurrentOver) {
                state.players[state.activePlayer].exit = isLastFrame;

                if (state.activePlayer === state.players.length - 1) {
                    if (isLastFrame) {
                        state.isOver = isLastFrame;
                    } else {
                        state.activePlayer = 0;
                    }
                } else {
                    state.activePlayer++;
                }

                state.current.pins = [];
                state.players[state.activePlayer].pins.push([]);
            }

            return state;
        }
    });

    store.appToken = dispatcher.register(function (action) {
        var state = store.state;

        switch (action.type) {
            case actionTypes.ADD_PLAYER:
                Object.assign(state, store.addPlayer(state));
                store.update(state);
                break;

            case actionTypes.START:
                state.isOn = true;
                store.update(state);
                break;

            case actionTypes.ROLL:
                if (state.isOver) {
                    return;
                }

                if (state.activePlayer === 0 && state.current.pins.length === 0) {
                    state.frame++;
                }

                state.current.score = action.value || gameService.roll(state.current.pins);
                state.current.pins.push(state.current.score);

                Object.assign(state, store.updateFrame(state));
                store.update(state);

                break;
        }
    });

    return {
        store: store
    };
}(
    app.eventEmitter,
    app.dispatcher,
    app.actionTypes,
    app.actions,
    app.gameService
)));
