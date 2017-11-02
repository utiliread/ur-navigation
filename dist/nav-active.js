var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject, bindable, bindingMode, customAttribute } from 'aurelia-framework';
var NavActive = /** @class */ (function () {
    function NavActive(element) {
        this.element = element;
        this.class = 'active';
    }
    NavActive.prototype.changeHandler = function () {
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
    };
    __decorate([
        bindable({ changeHandler: 'changeHandler', primaryProperty: true, defaultBindingMode: bindingMode.twoWay })
    ], NavActive.prototype, "active", void 0);
    __decorate([
        bindable({ changeHandler: 'changeHandler' })
    ], NavActive.prototype, "class", void 0);
    NavActive = __decorate([
        autoinject(),
        customAttribute('nav-active')
    ], NavActive);
    return NavActive;
}());
export { NavActive };
