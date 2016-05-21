Object.assign(app, (function (events) {

    // inherits event emitter
    var dispatcher = Object.create(events);

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

})(app.lib.events));
