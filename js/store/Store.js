import EventEmitter from '../utils/eventEmitter'
export default class Store extends EventEmitter {
    
    constructor (state) {
        this.state = state;
    }

    update(state) {
        this.state = Object.assign(this.state, state);
        this.emit('store.change');
    }

    onChange(fn) {
        this.on('store.change', () => fn(this.state));
    }
}
