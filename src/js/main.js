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

main.dispatcher = Object.create(main.lib.events);
Object.assign(main.dispatcher, {
    dispatch: function (action) {
        this.emit('action', action);
    },

    register: function (action) {
        this.on('action', action);
    }
});

main.actionTypes = {
    // user input
    ROLL: 'ROLL',

    // pins service
    KNOCK: 'KNOCK',
    STRIKE: 'STRIKE',
    SPARE: 'SPARE',

    // game flow
    CHANGE_PLAYER: 'CHANGE_PLAYER',
    NEXT_FRAME: 'NEXT_FRAME',
    END_GAME: 'END_GAME'
};

main.actions = {
    roll: function (id) {
        return {
            type: main.actionTypes.ROLL,
            id: id
        }
    },

    changePlayer: function (id) {
        return {
            type: main.actionTypes.CHANGE_PLAYER,
            id: id
        }
    },

    endGame: function () {
        return {
            type: main.actionTypes.END_GAME
        }
    }
};

// main.store
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

main.pinService = {

    // returns random number from 0 to 10
    roll: function () {
        return Math.floor(Math.random() * (10 - 1)) + 1;
    },

    isStrike: function (score) {
        return score === 10;
    },

    isSpare: function (pins, isStrike) {
        isStrike && pins.shift();

        if (!pins) {
            return false;
        }

        var summ = pins.reduce(function (acc, score) {
            acc += score;
            return acc;
        }, 0);

        return summ === 10;
    },

    isLastFrame: function (frame) {
        return frame === 10;
    },

    getWinner: function (players) {
        return 0;
    }
};

main.dispatcher.register(function (action) {
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

main.component = {

    getPin: function () {
        return this._tableCell || (this._tableCell = document.querySelector('#pin-' + this.id));
    },

    getScore: function () {
        return this._totalCell || (this._totalCell = document.querySelector('#score-' + this.id));
    },

    getControl: function () {
        return this._control || (this._control = document.querySelector('#control'));
    },

    addScore: function (score) {
        if (!score) {
            return this;
        }

        var node = document.createElement('div');
        node.setAttribute('class', 'pin');
        node.appendChild(document.createTextNode(score));
        this.getPin().appendChild(node);
        return this;
    },

    printTotal: function (score) {
        var scoreCell = this.getScore();
        while (scoreCell.firstChild) {
            scoreCell.removeChild(scoreCell.firstChild);
        }
        scoreCell.appendChild(document.createTextNode(score));
    },

    render: function (state) {
        state || (state = main.store.state);

        if (state.isOver) {

        }

        if (state.activeId === this.id - 1) {
            this.addScore(state.current.score).printTotal(state.players[this.id - 1].score);
        }
    },

    init: function (options) {
        this.id = options.id;
        this.getControl().addEventListener('click', function () {
            main.dispatcher.dispatch(main.actions.roll(options.id - 1));
        });

        main.store.onChange(this.render.bind(this));

        this.render();
    }
};

var playerOne = Object.create(main.component).init({
    id: 1
});

var playerTwo = Object.create(main.component).init({
    id: 2
});

var devtools = {
    prev: function (state, action) {
        console.log('prev state', state);
        console.log('action', action);
    },

    next: function (state) {
        console.log('next state', state);
    },

    init: function () {
        main.dispatcher.register(function (action) {
            //this.prev(main.store.state, action);
        }.bind(this));
    }
};

devtools.init();

