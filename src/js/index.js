Object.assign(app, (function (playersListComponent, controlComponent) {

    Object.create(playersListComponent).init({
        element: document.querySelector('#players-list')
    });

    Object.create(controlComponent).init({
        element: document.querySelector('#controls')
    });

    document.querySelector('#run-tests').addEventListener('click', function () {
        this.parentNode.removeChild(this);
        mocha.run();
    });
})(
    app.playersListComponent,
    app.controlComponent
));
