Object.assign(app, (function (eventEmitter) {

    // Inherits event emitter
    var dispatcher = Object.create(eventEmitter);

    Object.assign(dispatcher, {
        dispatch: function (action) {
            this.emit('action', action);
        },

        register: function (action) {
            this.on('action', action);
            return 'action';
        }
    });

    return {
        dispatcher: dispatcher
    }

})(app.eventEmitter));
