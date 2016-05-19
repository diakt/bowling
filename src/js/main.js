var main = main || {};

var devtools = {
    prev: function (state, action) {
        console.log('prev state', state);
        console.log('action', action);
    },
    next: function (state) {
        console.log('next state', state);
    }
};

main.initialState = {

    frames: 0,

    isLast: false,

    current: {
        score: 0,
        turn: 0,
        hasStrike: false,
        hasSpare: false
    },

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

    knock: function (score, id) {
        return {
            type: main.actionTypes.KNOCK,
            score: score,
            id: id
        }
    }
};

// main.store
main.store = Object.create(main.lib.events);
Object.assign(main.store, {
    state: main.initialState,

    setState: function (state) {
        Object.assign({}, this.state, state);
        this.emit('store.change');
    },

    addEventListener: function (fn) {
        var state = this.state;
        this.on('store.change', function () {
            fn(state);
        });
    }
});

main.pinService = {

    // returns random number from 0 to 10
    roll: function () {
        return Math.floor(Math.random() * (10 - 1)) + 1;
    }
};


main.dispatcher.register(function (action) {
    switch (action.type) {
        case main.actionTypes.ROLL:
            var score = main.pinService.roll();
            main.dispatcher.dispatch(main.actions.knock(score, action.id));

            break;

        case main.actionTypes.KNOCK:
            var state = main.store.state;
            state.players[action.id].score += action.score;
            state.current.score = action.score;
            main.store.setState(state);

            break;
    }
});

main.component = {

    getTableCell: function () {
        return this._tableCell || (this._tableCell = document.querySelector('#table-player-' + this.id));
    },

    getTotalCell: function () {
        return this._totalCell || (this._totalCell = document.querySelector('#total-player-' + this.id));
    },

    getControl: function () {
        return this._control || (this._control = document.querySelector('#control-player-' + this.id));
    },

    addScore: function (score) {
        if (!score) {
            return this;
        }

        var node = document.createElement('div');
        node.setAttribute('class', 'score');
        node.appendChild(document.createTextNode(score));
        this.getTableCell().appendChild(node);
        return this;
    },

    printTotal: function (score) {
        var totalCell = this.getTotalCell();
        while (totalCell.firstChild) {
            totalCell.removeChild(totalCell.firstChild);
        }
        totalCell.appendChild(document.createTextNode(score));
    },

    render: function (state) {
        state || (state = main.store.state);
        this.addScore(state.current.score).printTotal(state.players[0].score);
    },

    init: function (options) {
        this.id = options.id;
        this.getControl().addEventListener('click', function () {
            main.dispatcher.dispatch(main.actions.roll(0));
        });

        this.render();

        main.store.addEventListener(this.render.bind(this));
    }
};

main.component.init({
    id: 1
});
