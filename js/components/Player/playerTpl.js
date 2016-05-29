import {createNode} from 'utils/functions'
import style from './player.css'

export function elementTpl(){
    return createNode(`
        <div class="${style.player}"></div>
    `);
}

export function childrenTpl (props) {
    var frames = '';

    if (props.frames !== undefined && props.frames.length) {
        frames = props.frames.reduce((codeAcc, frame) => {
            codeAcc += `
                <div class="${style.frame}">
                    <div class="${style.score}">${(frame.score[0] || '')}</div>
                    <div class="${style.score}">${(frame.score[1] || '')}</div>
                    <div class="${style.frameScore}">${frame.previousScore}</div>
                </div>
            `;
            return codeAcc;
        }, '');
    }

    return createNode(`
        <div class="${style.playerWrapper} ${styleClassName(props)}">
            <div class="${style.name}">Player ${props.id}:</div>
            <div class="${style.frames}">${frames}</div>
        </div>
    `);
}

function styleClassName(props) {
    return props.classNames.map(className => style[className]);
}
