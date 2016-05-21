Object.assign(app, (function (playerComponent, controlComponent) {

    var playerOne = Object.create(playerComponent).init({
        id: 1
    });

    var playerTwo = Object.create(playerComponent).init({
        id: 2
    });

    var controls = Object.create(controlComponent).init();

    document.querySelector('#run-tests').addEventListener('click', function () {
        this.parentNode.removeChild(this);
        mocha.run();
    });

    return {
        playerOne: playerOne,
        playerTwo: playerTwo,
        controls: controls
    }
})(
    app.playerComponent,
    app.controlComponent
));
