var main = main || {};

main.initialState = {

    frame: 0,

    isLast: false,
    isOver: false,

    current: {
        score: 0,
        turn: 0,
        pins: [],
        isStrike: false,
        isSpare: false
    },

    activeId: 0,
    players: [
        {
            score: 0
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
            var score = main.pinService.roll();
            state.current.turn++;

            // strike
            if (state.current.turn === 1) {
                state.current.isStrike = main.pinService.isStrike(score);
            } else if (state.current.turn === 2 || (state.current.turn === 3 && state.current.isStrike)) {

                // change turn
                var changeId = action.id++;
                if (changeId > state.players.length - 1) {
                    changeId = 0;
                }

                state.activeId = changeId;

                if (!main.pinService.isLastFrame(state.frame)) {
                    state.frame++;
                }
            }

            // add score
            state.current.score = score;
            state.current.pins.push(score);
            state.current.isSpare = main.pinService.isSpare(state.current.pins, state.current.isStrike);

            main.store.update(state);
            break;

        case main.actionTypes.END_GAME:
            state.isOver = true;
            state.winnerId = main.pinService.getWinner(state.players);

            main.store.update(state);
    }
});
