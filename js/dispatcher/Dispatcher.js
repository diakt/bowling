import EventEmitter from 'utils/EventEmitter'

export default class Dispatcher extends EventEmitter {
    constructor(token) {
        super();
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
