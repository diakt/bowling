Object.assign(app, (function () {
    var abstractComponent = {
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
        abstractComponent: abstractComponent
    }
})());
