import {createNode} from 'utils/functions'

export function elementTpl(){
    return createNode(`
        <div id="players-list" class="scoreboard"></div>
    `);
}
