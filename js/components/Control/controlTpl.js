import {createNode} from 'utils/functions'

export function elementTpl() {
    return createNode(`
        <div id="controls" class="controls"></div>
    `);
}

const addPlayer = `
    <button class="control-add-player">Add player</button>
`;

const start = `
    <button class="start">Start</button>
`;

const rollRandom = `
    <button class="roll-random">?</button>
`;

function rollValue(available) {
    var buttons = '';
    for (let i = 0; i < available; i++) {
        buttons += `
            <button class="roll-value" data-value="${i + 1}">${i + 1}</button>
        `;
    }
    return buttons;
}

export function childrenTpl(props) {
    var buttons;
    if (props.available) {
        buttons = `
            <div class="buttons-container">
                ${rollRandom}
                ${rollValue(props.available)}
            </div>
        `;
    }

    return createNode(`
        <div id="controls" class="controls">
            ${(props.addPlayer ? addPlayer : '')}
            ${(props.start ? start : '')}
            ${(props.available ? buttons : '')}
        </div>
    `);
}
