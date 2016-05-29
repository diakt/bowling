export default class AbstractComponent {

    /**
     * Removes all children from passed node or from the root element of the component
     * @param {HTMLElement} [node]
     */
    removeChildNodes(node) {
        node || (node = this.element);
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return this;
    }

    /**
     * Updates child nodes of Component's element
     * @param {HTMLElement|Array} childNode
     */
    update(childNode) {
        this.removeChildNodes();

        if (Array.isArray(childNode)) {
            childNode.forEach(this.append.bind(this));
        } else {
            this.append(childNode);
        }

        return this;
    }

    append(Component) {

        // HTMLElement appends directly
        if (Component instanceof HTMLElement) {
            this.element.appendChild(Component);

            // Component Class appends its element, then instantiates itself
        } else if (typeof Component === 'function') {
            let element = Component.tpl();
            this.element.appendChild(element);
            new Component({element});

            // Object contains a Component Class and options for its initialization
            // First reads an element, then its options, then appends and instantiates Component
        } else if (Component instanceof Object && Component.Class) {
            let element = Component.Class.tpl();
            let options = {element};
            Object.assign(options, Component.options);
            this.element.appendChild(element);
            new Component.Class(options);
        }
    }
}
