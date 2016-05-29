import {createNode} from 'utils/functions'
import style from './layout.css'

export function elementTpl() {
    return createNode(`
        <div class="${style.layout}"></div>
    `);
}

export function welcomeTpl() {
    return createNode(`
        <div class="${style.welcome}">Please add new player</div>
    `)
}

export function isOverTpl() {
    return createNode(`
        <div class="${style.isOver}">The game is Over</div>
    `);
}

export function frameNumberTpl(props) {
    return createNode(`
        <div class="${style.frameNumber}">${props.text}</div>
    `);
}
