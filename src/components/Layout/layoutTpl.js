import {createNode} from 'utils/functions'
import style from './layout.css'

export function elementTpl() {
    return createNode(`
        <div class="${style.layout}"></div>
    `);
}

export function titleTpl() {
    return createNode(`
        <div class="${style.title}">
            Minimalistic interface
            for&nbsp;a&nbsp;<a class="${style.link}" href="https://github.com/diakt/bowling">bowling scoring system<a/>
        </div>
    `)
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
        <div class="${style.currentFrame}">Current frame: <span class="${style.number}">${props.frame}</span></div>
    `);
}
