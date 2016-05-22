Object.assign(app, (function (eventEmitter, dispatcher, actionTypes, actions, gameService) {

    var initialState = {
        frame: 0,
        maxScore: 0,

        isLast: false,
        isOver: false,
        isOn: false,

        current: {
            score: 0,
            available: 0,
            pins: []
        },

        activePlayer: null,
        players: []
    };

    // Inherits event emitter
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
                exit: false,
                isWinner: false
            });

            return state;
        },

        setWinner: function (state) {
            state.players.forEach(function (player) {
                var score = gameService.countArray(player.score);
                player.isWinner = score === state.maxScore;
            });
        },

        /**
         * Updates the state depending on the rules provided by the gameService
         * Defines whether the turn should be passed to the next player
         * @param {Object} state
         * @returns {Object} state
         */
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
                        state.maxScore = gameService.getMaxScore(state.players);
                    } else {
                        state.activePlayer = 0;
                    }
                } else {
                    state.activePlayer++;
                }

                state.current.pins = [];
                state.players[state.activePlayer].pins.push([]);
            }

            state.current.available = gameService.getAvailablePins(state.current.pins);

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
                state.activePlayer = 0;
                state.current.available = 10;
                store.update(state);
                break;

            case actionTypes.ROLL:
                state.current.score = action.value || gameService.roll(state.current.pins);
                state.current.pins.push(state.current.score);

                // update current player
                Object.assign(state, store.updateFrame(state));
                store.update(state);

                // check if the game if over or prepare for the next roll
                if (state.isOver) {
                    Object.assign(state, store.setWinner(state));
                } else if (state.activePlayer === 0 && state.current.pins.length === 0) {
                    state.frame++;
                }

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
