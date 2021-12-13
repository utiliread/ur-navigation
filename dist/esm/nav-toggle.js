var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, bindingMode, customAttribute } from 'aurelia-framework';
var NavToggle = /** @class */ (function () {
    function NavToggle(element) {
        this.element = element;
        this.click = this.click.bind(this);
    }
    NavToggle.prototype.attached = function () {
        this.element.addEventListener('click', this.click);
    };
    NavToggle.prototype.detached = function () {
        this.element.removeEventListener('click', this.click);
    };
    NavToggle.prototype.click = function (event) {
        event.preventDefault();
        this.active = !this.active;
    };
    __decorate([
        bindable({ primaryProperty: true, defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Boolean)
    ], NavToggle.prototype, "active", void 0);
    NavToggle = __decorate([
        autoinject(),
        customAttribute('nav-toggle'),
        __metadata("design:paramtypes", [Element])
    ], NavToggle);
    return NavToggle;
}());
export { NavToggle };
//# sourceMappingURL=nav-toggle.js.map