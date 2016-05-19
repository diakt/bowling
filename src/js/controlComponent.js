var main = main || {};

main.controlComponent = {
    init: function () {
        this.getControl().addEventListener('click', function () {
            main.dispatcher.dispatch(main.actions.roll());
        });
    },

    getControl: function () {
        return this._control || (this._control = document.querySelector('#control'));
    }
};
