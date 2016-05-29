import {createNode} from 'utils/functions'
import style from './playersList.css'

export function elementTpl(){
    return createNode(`
        <div id="players-list" class="${style.scoreboard}"></div>
    `);
}
