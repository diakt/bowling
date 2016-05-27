import Store from './Store'
import actionTypes from 'consts/actionTypes'
import Game from 'utils/Game'
import appDispatcher from 'dispatcher/appDispatcher'
import {countArray} from 'utils/functions'

const initialState = {
    frame: 0,
    maxScore: 0,

    isOver: false,
    isOn: false,

    players: [],
    current: {
        player: null,
        score: 0,
        available: 0,
        pins: []
    }
};

class AppStore extends Store {
    constructor(options) {
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

    /**
     * Sets the player earned most points as a winner,
     * accepts multiple winners if they earned the same number of points
     * @param {Object} state
     */
    setWinner(state) {
        state.players.forEach((player) => {
            var score = countArray(player.score);
            player.isWinner = score === state.maxScore;
        });
    }

    /**
     * Updates the global state due to the latest roll in order to proceed or finish the game
     * @param {Object} state
     * @returns {Object} state
     */
    updateGame(state) {
        var score = state.current.score;
        var frame = state.players[state.current.player].pins.length - 1;
        var isCurrentOver = Game.isOver(state.current.pins);
        var isLastFrame = Game.isLastFrame(state.frame);

        // Sets the number of knocked down pins to the current player's state
        state.players[state.current.player].pins[frame].push(score);
        state.players[state.current.player].score[frame] = Game.countScore(state.current.pins);
        state.players[state.current.player].strikes[frame] = Game.isStrike(state.current.pins);
        state.players[state.current.player].spares[frame] = Game.isSpare(state.current.pins);

        // Manages the end of current frame
        if (isCurrentOver) {
            state.players[state.current.player].exit = isLastFrame;

            if (state.current.player === state.players.length - 1) {
                if (isLastFrame) {
                    state.isOver = isLastFrame;
                    state.isOn = !isLastFrame;
                    state.maxScore = Game.getMaxScore(state.players);
                } else {
                    state.current.player = 0;
                }
            } else {
                state.current.player++;
            }

            state.current.pins = [];
            state.players[state.current.player].pins.push([]);
        }

        // Gets the number of available pins for the next roll
        state.current.available = Game.getAvailablePins(state.current.pins);

        // Checks if the game is over or prepares it for the next roll
        if (state.isOver) {
            Object.assign(state, appStore.setWinner(state));
        } else if (state.current.player === 0 && state.current.pins.length === 0) {
            state.frame++;
        }
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
            state.current.player = 0;
            state.current.available = 10;
            appStore.update(state);
            break;

        case actionTypes.ROLL:

            // Pulls the number of pins knocked down in the current roll
            state.current.score = action.value || Game.roll(state.current.pins);
            state.current.pins.push(state.current.score);

            // Updates the game state
            Object.assign(state, appStore.updateGame(state));
            appStore.update(state);
            break;
    }
});

export default appStore;
