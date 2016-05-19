var main = main || {};

main.dispatcher = Object.create(main.lib.events);
Object.assign(main.dispatcher, {
    dispatch: function (action) {
        this.emit('action', action);
    },

    register: function (action) {
        this.on('action', action);

        return 'action';
    }
});
