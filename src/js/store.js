Object.assign(app, (function (eventEmitter, dispatcher, actionTypes, actions, gameService) {

    var initialState = {
        frame: 0,

        isLast: false,
        isOver: false,

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
            var frame =  state.players[state.activePlayer].pins.length - 1;

            state.players[state.activePlayer].pins[frame].push(score);
            state.players[state.activePlayer].score[frame] = gameService.countScore(state.current.pins);
            state.players[state.activePlayer].strikes[frame] = gameService.isStrike(state.current.pins);
            state.players[state.activePlayer].spares[frame] = gameService.isSpare(state.current.pins);

            var isCurrentOver = gameService.isOver(state.current.pins);
            var isLastFrame = gameService.isLastFrame(frame);

            if (isCurrentOver) {
                state.players[state.activePlayer].exit = isLastFrame;

                if (state.activePlayer === state.players.length - 1 && isLastFrame) {
                    state.isOver = true;
                } else {
                    state.activePlayer = gameService.activePlayer(
                        state.current.pins, state.activePlayer, state.players.length
                    );
                    state.frame++;
                    state.current.pins = [];
                    state.players[state.activePlayer].pins.push([]);
                }
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

            case actionTypes.ROLL:
                if (state.isOver) {
                    return;
                }

                state.current.score = gameService.roll(state.current.pins);
                state.current.pins.push(state.current.score);

                Object.assign(state, store.updateFrame(state));
                store.update(state);

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
    app.eventEmitter,
    app.dispatcher,
    app.actionTypes,
    app.actions,
    app.gameService
)));
