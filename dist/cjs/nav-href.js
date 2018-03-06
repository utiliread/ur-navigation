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
var aurelia_router_1 = require("aurelia-router");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var ur_route_mapper_1 = require("ur-route-mapper");
var NavHref = /** @class */ (function () {
    function NavHref(element, routeMapper, eventAggregator, router, taskQueue) {
        this.element = element;
        this.routeMapper = routeMapper;
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.taskQueue = taskQueue;
        this.routerIsProcessing = false;
        this.click = this.click.bind(this);
    }
    NavHref.prototype.attached = function () {
        var _this = this;
        this.params = this.params || {};
        this.routerNavigationSuccess({ instruction: this.router.currentInstruction });
        this.disposables = [
            this.eventAggregator.subscribe('router:navigation:processing', function () { return _this.routerIsProcessing = true; }),
            this.eventAggregator.subscribe('router:navigation:success', this.routerNavigationSuccess.bind(this)),
        ];
        this.element.addEventListener('click', this.click);
    };
    NavHref.prototype.detached = function () {
        this.element.removeEventListener('click', this.click);
        for (var _i = 0, _a = this.disposables; _i < _a.length; _i++) {
            var disposable = _a[_i];
            disposable.dispose();
        }
    };
    NavHref.prototype.processChange = function () {
        if (this.route && this.params) {
            var href = this.routeMapper.generate(this.route, this.params);
            this.element.setAttribute('href', href);
        }
    };
    NavHref.prototype.activeChanged = function () {
        if (this.active) {
            var element = this.element;
            while (element) {
                if (element && element.au && element.au['nav-active']) {
                    element.au['nav-active'].viewModel.active = true;
                }
                element = element.parentElement;
            }
        }
    };
    NavHref.prototype.click = function () {
        if (!this.routerIsProcessing) {
            // The router is not processing because the route is already active.
            this.active = !this.active;
        }
        this.routerIsProcessing = false;
    };
    NavHref.prototype.routerNavigationSuccess = function (event) {
        var _this = this;
        var instructions = event.instruction.getAllInstructions();
        var route = instructions.map(function (x) { return x.config.name; }).join('.');
        var params = this.getParams(instructions);
        if (this.routeMatch(route) && this.paramsMatch(params)) {
            // Delay activation so that all nav-hrefs can set to false before we start to activate again.
            this.taskQueue.queueTask(function () {
                _this.active = true;
            });
        }
        else {
            this.active = false;
        }
    };
    NavHref.prototype.getParams = function (instructions) {
        var params = {};
        for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
            var instruction = instructions_1[_i];
            for (var parameterName in instruction.params) {
                params[parameterName] = instruction.params[parameterName];
            }
        }
        return params;
    };
    NavHref.prototype.routeMatch = function (route) {
        return route === this.route || route.startsWith(this.route + '.');
    };
    NavHref.prototype.paramsMatch = function (params) {
        if (this.params) {
            for (var propertyName in this.params) {
                if (propertyName in params) {
                    if (this.params[propertyName] === null && params[propertyName] === null) {
                        continue;
                    }
                    if (this.params[propertyName].toString() === params[propertyName]) {
                        continue;
                    }
                }
                return false;
            }
        }
        return true;
    };
    __decorate([
        aurelia_framework_1.bindable({ changeHandler: 'processChange', primaryProperty: true }),
        __metadata("design:type", String)
    ], NavHref.prototype, "route", void 0);
    __decorate([
        aurelia_framework_1.bindable({ changeHandler: 'processChange' }),
        __metadata("design:type", Object)
    ], NavHref.prototype, "params", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Boolean)
    ], NavHref.prototype, "active", void 0);
    NavHref = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('nav-href'),
        __metadata("design:paramtypes", [Element, ur_route_mapper_1.RouteMapper, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.AppRouter, aurelia_framework_1.TaskQueue])
    ], NavHref);
    return NavHref;
}());
exports.NavHref = NavHref;
//# sourceMappingURL=nav-href.js.map