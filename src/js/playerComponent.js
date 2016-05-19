var main = main || {};

main.playerComponent = {

    getPin: function () {
        return this._tableCell || (this._tableCell = document.querySelector('#pin-' + this.id));
    },

    getScore: function () {
        return this._totalCell || (this._totalCell = document.querySelector('#score-' + this.id));
    },

    clearChildren: function (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return this;
    },

    printScore: function (score) {
        if (score === undefined) {
            return this;
        }

        var node = document.createElement('div');
        node.setAttribute('class', 'pin');
        node.appendChild(document.createTextNode(score));
        this.getPin().appendChild(node);
        return this;
    },

    printTotal: function (score) {
        this.getScore().appendChild(document.createTextNode(score));
    },

    render: function (state) {
        state || (state = main.store.state);

        this.clearChildren(this.getPin()).clearChildren(this.getScore());

        // prints all previous frames
        state.players[this.id - 1].pins.forEach(this.printScore.bind(this));

        // prints total score
        this.printTotal(state.players[this.id - 1].score);

        if (state.players[this.id - 1].isOver) {
            this.disable();
        }
    },

    disable: function () {
        console.log('#' + this.id + ' – disabled!');
    },

    init: function (options) {
        this.id = options.id;

        main.store.onChange(this.render.bind(this));

        this.render();
    }
};
