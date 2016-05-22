Object.assign(app, (function (actionTypes) {
    var actions = {
        roll: function (value) {
            return {
                type: actionTypes.ROLL,
                value: value
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
