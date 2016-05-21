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
        }
    };

    return {
        actions: actions
    };

})(app.actionTypes));
