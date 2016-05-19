var main = main || {};

main.component = {

    getPin: function () {
        return this._tableCell || (this._tableCell = document.querySelector('#pin-' + this.id));
    },

    getScore: function () {
        return this._totalCell || (this._totalCell = document.querySelector('#score-' + this.id));
    },

    getControl: function () {
        return this._control || (this._control = document.querySelector('#control'));
    },

    addScore: function (score) {
        if (!score) {
            return this;
        }

        var node = document.createElement('div');
        node.setAttribute('class', 'pin');
        node.appendChild(document.createTextNode(score));
        this.getPin().appendChild(node);
        return this;
    },

    printTotal: function (score) {
        var scoreCell = this.getScore();
        while (scoreCell.firstChild) {
            scoreCell.removeChild(scoreCell.firstChild);
        }
        scoreCell.appendChild(document.createTextNode(score));
    },

    render: function (state) {
        state || (state = main.store.state);

        if (state.isOver) {

        }

        if (state.activeId === this.id - 1) {
            this.addScore(state.current.score).printTotal(state.players[this.id - 1].score);
        }
    },

    init: function (options) {
        this.id = options.id;
        this.getControl().addEventListener('click', function () {
            main.dispatcher.dispatch(main.actions.roll(options.id - 1));
        });

        main.store.onChange(this.render.bind(this));

        this.render();
    }
};
