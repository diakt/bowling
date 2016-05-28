import {createNode} from 'utils/functions'

export function elementTpl(){
    return createNode(`
        <div class="player"></div>
    `);
}

export function childrenTpl (props) {
    var frames = '';

    if (props.frames !== undefined) {
        frames = props.frames.reduce((codeAcc, frame) => {
            codeAcc += `
                <div class="frame">
                    <div class="score">${(frame.score[0] || '')}</div>
                    <div class="score">${(frame.score[1] || '')}</div>
                    <div class="frame-score">${frame.previousScore}</div>
                </div>
            `;
            return codeAcc;
        }, '');
    }

    return createNode(`
        <div class="player-wrapper">
            <div class="name">Player ${props.id}:</div>
            <div class="frames">${frames}</div>
        </div>
    `);
}
