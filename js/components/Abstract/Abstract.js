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

    updateClass(className) {
        var classes = (this.element.className + ' ' + className).split(' ');
        var unique = Array.from(new Set(classes));
        this.element.className = unique.join(' ');
        return this;
    }

    /**
     * Updates child nodes of Component's element
     * @param {String|HTMLElement|Array} className
     * @param {String|HTMLElement|Array} [childNode]
     */
    update(className, childNode) {

        this.removeChildNodes();

        if (typeof className === 'string') {
            this.updateClass(className);
        } else {
            childNode = className;
        }

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
