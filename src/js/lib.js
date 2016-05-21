Object.assign(app, (function () {

    var topics = {};
    var subUid = -1;
    var events = {
        emit: function (topic, args) {

            if (!topics[topic]) {
                return false;
            }

            var subscribers = topics[topic];
            var len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func(args);
            }

            return this;
        },

        on: function (topic, func) {
            if (!topics[topic]) {
                topics[topic] = [];
            }

            var token = ( ++subUid ).toString();
            topics[topic].push({
                token: token,
                func: func
            });
            return token;
        },

        off: function (token) {
            for (var m in topics) {
                if (topics[m]) {
                    for (var i = 0, j = topics[m].length; i < j; i++) {
                        if (topics[m][i].token === token) {
                            topics[m].splice(i, 1);
                            return token;
                        }
                    }
                }
            }
            return this;
        }
    };

    var component = {
        removeChildNodes: function (node) {
            node || (node = this.element);
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            return this;
        },

        createElement: function (attrs, text) {
            var element = document.createElement((attrs && attrs.tag) || 'div');
            if (attrs) {
                if (typeof attrs === 'string') {
                    element.setAttribute('class', attrs);
                } else if (typeof attrs === 'object') {
                    Object.keys(attrs).forEach(function (attrName) {
                        if (attrName !== 'tag' || attrName !== 'text') {
                            element.setAttribute(attrName, attrs[attrName]);
                        }
                    });
                }
            }

            text || (text = attrs && attrs.text || null);

            if (text) {
                element.appendChild(document.createTextNode(text));
            }

            return element;
        }
    };

    return {
        lib: {
            events: events,
            component: component
        }
    }
})());
