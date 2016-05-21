Object.assign(app, (function (actionTypes) {
    var actions = {
        roll: function () {
            return {
                type: actionTypes.ROLL
            }
        },

        endGame: function () {
            return {
                type: actionTypes.END_GAME
            }
        },

        addPlayer: function () {
            return {
                type: actionTypes.ADD_PLAYER
            }
        }
    };

    return {
        actions: actions
    };

})(app.actionTypes));
