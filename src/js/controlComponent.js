Object.assign(app, (function (actions, dispatcher) {

    var controlComponent = {
        init: function () {
            this.getControl().addEventListener('click', function () {
                dispatcher.dispatch(actions.roll());
            });
        },

        getControl: function () {
            return this._control || (this._control = document.querySelector('#control'));
        }
    };

    return {
        controlComponent: controlComponent
    };

})(app.actions, app.dispatcher));
