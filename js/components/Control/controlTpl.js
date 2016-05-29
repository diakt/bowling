import {createNode} from 'utils/functions'
import style from './control.css'

export function elementTpl() {
    return createNode(`
        <div id="controls" class="${style.controls}"></div>
    `);
}

export function addPlayerTpl() {
    return createNode(`
        <button class="${style.button} ${style.addPlayer}" data-click="add-player">Add player</button>
    `);
}

export function startTpl() {
    return createNode(`
        <button class="${style.button} ${style.start}" data-click="start">Start</button>
    `);
}

function rollValue(available) {
    var buttons = '';
    for (let i = 0; i < available; i++) {
        buttons += `
            <button class="${style.button}"
                data-click="roll-value" data-value="${i + 1}">${i + 1}</button>
        `;
    }
    return buttons;
}

export function buttonsTpl(props) {
    return createNode(`
        <div class="${style.container}">
            <div class="${style.noteRandom}">Try roll at random</div>
            <button class="${style.button} ${style.rollRandom}" data-click="roll-random">0...${props.available}</button>
            <div class="${style.note}">or choose the exact number of pins to be knocked down</div>
            <div class="${style.buttonsContainer}">
                ${rollValue(props.available)}
            </div>
        </div>
    `);
}
