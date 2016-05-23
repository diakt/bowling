import Store from './Store'
import actionTypes from '../consts/actionTypes'
import Game from '../utils/Game'
import appDispatcher from '../dispatcher/appDispatcher'

const initialState = {
    frame: 0,
    maxScore: 0,

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

class AppStore extends Store {
    constructor(options){
        super(options);
    }

    addPlayer(state) {
        state.players.push({
            pins: [[]],
            strikes: [],
            spares: [],
            score: [],
            exit: false,
            isWinner: false
        });

        return state;
    }

    setWinner(state) {
        state.players.forEach((player) => {
            var score = Game.countArray(player.score);
            player.isWinner = score === state.maxScore;
        });
    }

    /**
     * Updates the state depending on the rules provided by the Game
     * Defines whether the turn should be passed to the next player
     * @param {Object} state
     * @returns {Object} state
     */
    updateFrame(state) {
        var score = state.current.score;

        // player's personal frame
        var frame = state.players[state.activePlayer].pins.length - 1;

        state.players[state.activePlayer].pins[frame].push(score);
        state.players[state.activePlayer].score[frame] = Game.countScore(state.current.pins);
        state.players[state.activePlayer].strikes[frame] = Game.isStrike(state.current.pins);
        state.players[state.activePlayer].spares[frame] = Game.isSpare(state.current.pins);

        var isCurrentOver = Game.isOver(state.current.pins);
        var isLastFrame = Game.isLastFrame(state.frame);

        // manages next frame and next player
        if (isCurrentOver) {
            state.players[state.activePlayer].exit = isLastFrame;

            if (state.activePlayer === state.players.length - 1) {
                if (isLastFrame) {
                    state.isOver = isLastFrame;
                    state.isOn = !state.isOver;
                    state.maxScore = Game.getMaxScore(state.players);
                } else {
                    state.activePlayer = 0;
                }
            } else {
                state.activePlayer++;
            }

            state.current.pins = [];
            state.players[state.activePlayer].pins.push([]);
        }

        state.current.available = Game.getAvailablePins(state.current.pins);

        return state;
    }
}

const appStore = new AppStore(initialState);

appStore.appToken = appDispatcher.register((action) => {
    var state = appStore.state;

    switch (action.type) {
        case actionTypes.ADD_PLAYER:
            Object.assign(state, appStore.addPlayer(state));
            appStore.update(state);
            break;

        case actionTypes.START:
            state.isOn = true;
            state.activePlayer = 0;
            state.current.available = 10;
            appStore.update(state);
            break;

        case actionTypes.ROLL:
            state.current.score = action.value || Game.roll(state.current.pins);
            state.current.pins.push(state.current.score);

            // update current player
            Object.assign(state, appStore.updateFrame(state));
            appStore.update(state);

            // check if the game if over or prepare for the next roll
            if (state.isOver) {
                Object.assign(state, appStore.setWinner(state));
            } else if (state.activePlayer === 0 && state.current.pins.length === 0) {
                state.frame++;
            }

            appStore.update(state);
            break;
    }
});

export default appStore;
