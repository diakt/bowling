import {createNode} from 'utils/functions'

export function welcomeTpl() {
    return createNode(`
        <div class="welcome">Please add new player</div>
    `)
}
