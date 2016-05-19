var main = main || {};

main.playerOne = Object.create(main.playerComponent).init({
    id: 1
});

main.playerTwo = Object.create(main.playerComponent).init({
    id: 2
});

main.controls = Object.create(main.controlComponent).init();

var devtools = {
    prev: function (state, action) {
        console.log('prev state', state);
        console.log('action', action);
    },

    next: function (state) {
        console.log('next state', state);
    },

    init: function () {
        main.dispatcher.register(function (action) {
            //this.prev(main.store.state, action);
        }.bind(this));
    }
};

devtools.init();

