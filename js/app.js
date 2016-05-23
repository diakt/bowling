import layout from 'components/Layout'


Object.assign(app, (function (playersListComponent, controlComponent) {

    Object.create(playersListComponent).init({
        element: document.querySelector('#players-list')
    });

    Object.create(controlComponent).init({
        element: document.querySelector('#controls')
    });
})(
    app.playersListComponent,
    app.controlComponent
));
