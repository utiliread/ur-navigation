import { autoinject, bindable, bindingMode, customAttribute } from 'aurelia-framework';

@autoinject()
@customAttribute('nav-toggle')
export class NavToggle {
    @bindable({ primaryProperty: true, defaultBindingMode: bindingMode.twoWay })
    active: boolean;

    constructor(private element: Element) {
        this.click = this.click.bind(this);
    }

    attached() {
        this.element.addEventListener('click', this.click);
    }

    detached() {
        this.element.removeEventListener('click', this.click);
    }

    private click() {
        this.active = !this.active;
    }
}