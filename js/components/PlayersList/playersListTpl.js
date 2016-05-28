import {createNode} from 'utils/functions'

export function elementTpl(){
    return createNode(`
        <div id="players-list" class="scoreboard"></div>
    `);
}

export function isOverTpl() {
    return createNode(`
        <div class="is-over">The game is Over</div>
    `);
}

export function frameNumberTpl(data) {
    return createNode(`
        <div class="frame-number">${data.text}</div>
    `);
}
