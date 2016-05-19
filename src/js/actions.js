var main = main || {};

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
