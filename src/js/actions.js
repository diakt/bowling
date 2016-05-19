var main = main || {};

main.actions = {
    roll: function () {
        return {
            type: main.actionTypes.ROLL
        }
    },

    endGame: function () {
        return {
            type: main.actionTypes.END_GAME
        }
    }
};
