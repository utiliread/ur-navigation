"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavActive = void 0;
var aurelia_framework_1 = require("aurelia-framework");
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
        (0, aurelia_framework_1.bindable)({ changeHandler: 'changeHandler', primaryProperty: true, defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Boolean)
    ], NavActive.prototype, "active", void 0);
    __decorate([
        (0, aurelia_framework_1.bindable)({ changeHandler: 'changeHandler' }),
        __metadata("design:type", Object)
    ], NavActive.prototype, "class", void 0);
    NavActive = __decorate([
        (0, aurelia_framework_1.autoinject)(),
        (0, aurelia_framework_1.customAttribute)('nav-active'),
        __metadata("design:paramtypes", [Element])
    ], NavActive);
    return NavActive;
}());
exports.NavActive = NavActive;
//# sourceMappingURL=nav-active.js.map