var main = main || {};

main.initialState = {

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

main.store = Object.create(main.lib.events);

Object.assign(main.store, {
    state: main.initialState,
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

main.store.mainToken = main.dispatcher.register(function (action) {
    var state = Object.assign({}, main.store.state);

    switch (action.type) {
        case main.actionTypes.ROLL:
            if (state.isOver) {
                return;
            }
            var score = main.gameService.roll(state.current.pins);

            // set current frame score
            state.current.score = score;
            state.current.pins.push(score);

            // set score to active player
            state.players[state.activeId].score += score;

            var pins = state.players[state.activeId].pins;
            pins[pins.length - 1].push(score);

            // set special achievements
            state.current.isStrike = main.gameService.isStrike(state.current.pins);
            state.current.isSpare = main.gameService.isSpare(state.current.pins);

            // update view
            main.store.update(state);

            // update the game state
            var isOver = main.gameService.isOver(state.current.pins);

            if (isOver) {
                state.current.pins = [];
                state.players[state.activeId].pins.push([]);
                state.activeId++;

                if (state.activeId > state.players.length - 1) {
                    state.frame++;
                    state.isLast = main.gameService.isLastFrame(state.frame);
                    if (state.isLast) {
                        state.isOver = true;
                    } else {
                        state.activeId = 0;
                    }
                }
                main.store.update(state);
            }

            break;

        case main.actionTypes.END_GAME:
            state.isOver = true;
            main.store.update(state);
            break;
    }
});
