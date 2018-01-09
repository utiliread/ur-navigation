var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AppRouter } from 'aurelia-router';
import { TaskQueue, autoinject, bindable, bindingMode, customAttribute } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RouteMapper } from 'ur-route-mapper';
let NavHref = class NavHref {
    constructor(element, routeMapper, eventAggregator, router, taskQueue) {
        this.element = element;
        this.routeMapper = routeMapper;
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.taskQueue = taskQueue;
        this.routerIsProcessing = false;
        this.click = this.click.bind(this);
    }
    attached() {
        this.params = this.params || {};
        this.routerNavigationSuccess({ instruction: this.router.currentInstruction });
        this.disposables = [
            this.eventAggregator.subscribe('router:navigation:processing', () => this.routerIsProcessing = true),
            this.eventAggregator.subscribe('router:navigation:success', this.routerNavigationSuccess.bind(this)),
        ];
        this.element.addEventListener('click', this.click);
    }
    detached() {
        this.element.removeEventListener('click', this.click);
        for (let disposable of this.disposables) {
            disposable.dispose();
        }
    }
    processChange() {
        if (this.route && this.params) {
            let href = this.routeMapper.generate(this.route, this.params);
            this.element.setAttribute('href', href);
        }
    }
    activeChanged() {
        if (this.active) {
            let element = this.element;
            while (element) {
                if (element && element.au && element.au['nav-active']) {
                    element.au['nav-active'].viewModel.active = true;
                }
                element = element.parentElement;
            }
        }
    }
    click() {
        if (!this.routerIsProcessing) {
            // The router is not processing because the route is already active.
            this.active = !this.active;
        }
        this.routerIsProcessing = false;
    }
    routerNavigationSuccess(event) {
        let instructions = event.instruction.getAllInstructions();
        let route = instructions.map(x => x.config.name).join('.');
        let params = this.getParams(instructions);
        if (this.routeMatch(route) && this.paramsMatch(params)) {
            // Delay activation so that all nav-hrefs can set to false before we start to activate again.
            this.taskQueue.queueTask(() => {
                this.active = true;
            });
        }
        else {
            this.active = false;
        }
    }
    getParams(instructions) {
        let params = {};
        for (let instruction of instructions) {
            for (let parameterName in instruction.params) {
                params[parameterName] = instruction.params[parameterName];
            }
        }
        return params;
    }
    routeMatch(route) {
        return route === this.route || route.startsWith(this.route + '.');
    }
    paramsMatch(params) {
        if (this.params) {
            for (let propertyName in this.params) {
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
    }
};
__decorate([
    bindable({ changeHandler: 'processChange', primaryProperty: true }),
    __metadata("design:type", String)
], NavHref.prototype, "route", void 0);
__decorate([
    bindable({ changeHandler: 'processChange' }),
    __metadata("design:type", Object)
], NavHref.prototype, "params", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Boolean)
], NavHref.prototype, "active", void 0);
NavHref = __decorate([
    autoinject(),
    customAttribute('nav-href'),
    __metadata("design:paramtypes", [Element, RouteMapper, EventAggregator, AppRouter, TaskQueue])
], NavHref);
export { NavHref };
