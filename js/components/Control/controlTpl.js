import {createNode} from 'utils/functions'

export function elementTpl() {
    return createNode(`
        <div id="controls" class="controls"></div>
    `);
}

export function addPlayerTpl() {
    return createNode(`
        <button class="control-add-player">Add player</button>
    `);
}

export function startTpl() {
    return createNode(`
        <button class="start">Start</button>
    `);
}

function rollValue(available) {
    var buttons = '';
    for (let i = 0; i < available; i++) {
        buttons += `
            <button class="roll-value" data-value="${i + 1}">${i + 1}</button>
        `;
    }
    return buttons;
}

export function buttonsTpl(props) {

    return createNode(`
        <div class="buttons-container">
            <div class="note">Choose the number of pins to be knocked down</div>
            <div class="buttons-container">
                <button class="roll-random">?</button>
                ${rollValue(props.available)}
            </div>
        </div>
    `);
}
