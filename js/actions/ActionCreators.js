import actionTypes from '../consts/actionTypes'

export function start() {
    return {
        type: actionTypes.START
    }
}

export function roll(value) {
    return {
        type: actionTypes.ROLL,
        value: value
    }
}


export function addPlayer() {
    return {
        type: actionTypes.ADD_PLAYER
    }
}

