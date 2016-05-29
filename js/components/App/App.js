import appStore from 'store/appStore'
import {Layout, AbstractComponent} from 'components'

export default class App extends AbstractComponent {
    constructor(options) {
        super();
        this.element = options.element;
        this.render();
        appStore.onChange(this.render.bind(this));
    }

    render() {
        this.update(Layout);
    }
}
