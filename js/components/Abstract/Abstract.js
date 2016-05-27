export default class AbstractComponent {

    /**
     * Removes all children from passed node or from the root element of the component
     * @param {HTMLElement} [node]
     */
    removeChildNodes (node) {
        node || (node = this.element);
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return this;
    }

    /**
     * Shorthand for native DOM methods
     * @param {Object|String} attrs
     * @param {String} [attrs.text]
     * @param {String} [attrs.tag]
     * @param {String} [text]
     */
    createElement (attrs, text) {
        var element = document.createElement((attrs && attrs.tag) || 'div');
        if (attrs) {
            if (typeof attrs === 'string') {
                element.setAttribute('class', attrs);
            } else if (typeof attrs === 'object') {
                Object.keys(attrs).forEach((attrName) => {
                    if (attrName !== 'tag' && attrName !== 'text') {
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
}
