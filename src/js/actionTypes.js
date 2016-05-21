Object.assign(app, (function () {
    var actionTypes = {
        // user input
        ROLL: 'ROLL',

        // pins service
        KNOCK: 'KNOCK',
        STRIKE: 'STRIKE',
        SPARE: 'SPARE',

        // game flow
        ADD_PLAYER: 'ADD_PLAYER',
        CHANGE_PLAYER: 'CHANGE_PLAYER',
        NEXT_FRAME: 'NEXT_FRAME',
        END_GAME: 'END_GAME'
    };

    return {
        actionTypes: actionTypes
    }
})());
