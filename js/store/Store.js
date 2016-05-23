import EventEmitter from '../utils/EventEmitter'
export default class Store extends EventEmitter {
    
    constructor (state) {
        super();
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
