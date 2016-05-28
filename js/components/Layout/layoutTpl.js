import {createNode} from 'utils/functions'

export function welcomeTpl() {
    return createNode(`
        <div class="welcome">Please add new player</div>
    `)
}

export function isOverTpl() {
    return createNode(`
        <div class="is-over">The game is Over</div>
    `);
}

export function frameNumberTpl(props) {
    return createNode(`
        <div class="frame-number">${props.text}</div>
    `);
}
