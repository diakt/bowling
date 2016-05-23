Object.assign(app, (function (actionTypes) {
    var actions = {

        start: function () {
            return {
                type: actionTypes.START
            }
        },

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
