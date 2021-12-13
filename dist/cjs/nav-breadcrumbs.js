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
exports.NavBreadcrumbsCustomElement = void 0;
var aurelia_router_1 = require("aurelia-router");
var aurelia_framework_1 = require("aurelia-framework");
var NavBreadcrumbsCustomElement = /** @class */ (function () {
    function NavBreadcrumbsCustomElement(router) {
        while (router.parent) {
            router = router.parent;
        }
        this.router = router;
    }
    NavBreadcrumbsCustomElement = __decorate([
        (0, aurelia_framework_1.autoinject)(),
        __metadata("design:paramtypes", [aurelia_router_1.Router])
    ], NavBreadcrumbsCustomElement);
    return NavBreadcrumbsCustomElement;
}());
exports.NavBreadcrumbsCustomElement = NavBreadcrumbsCustomElement;
//# sourceMappingURL=nav-breadcrumbs.js.map