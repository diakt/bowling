import eventEmitter from '../utils/EventEmitter'

export default class Dispatcher extends eventEmitter {
    constructor (token) {
        this.token = token;
    }

    dispatch(action) {
        this.emit(`${this.token}`, action);
    }

    register(action) {
        this.on(`${this.token}`, action);
        return this.token;
    }
}
