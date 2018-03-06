import { autoinject, bindable, bindingMode, customAttribute } from 'aurelia-framework';

@autoinject()
@customAttribute('nav-active')
export class NavActive {
    @bindable({ changeHandler: 'changeHandler', primaryProperty: true, defaultBindingMode: bindingMode.twoWay })
    active!: boolean;

    @bindable({ changeHandler: 'changeHandler' })
    class = 'active';

    constructor(private element: Element) {
    }

    changeHandler() {
        if (this.class) {
            if (this.active) {
                if (!this.element.classList.contains(this.class)) {
                    this.element.classList.add(this.class);
                }
            }
            else {
                if (this.element.classList.contains(this.class)) {
                    this.element.classList.remove(this.class);
                }
            }
        }
    }
}