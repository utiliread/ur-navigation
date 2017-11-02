import { AppRouter, NavigationInstruction } from 'aurelia-router';
import { Disposable, TaskQueue, autoinject, bindable, bindingMode, customAttribute } from 'aurelia-framework';

import { EventAggregator } from 'aurelia-event-aggregator';
import { RouteMapper } from 'ur-route-mapper';

@autoinject()
@customAttribute('nav-href')
export class NavHref {
    @bindable({ changeHandler: 'processChange', primaryProperty: true })
    route: string;

    @bindable({ changeHandler: 'processChange' })
    params: any;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    active: boolean;

    private routerIsProcessing = false;
    private disposables: Disposable[];

    constructor(private element: Element, private routeMapper: RouteMapper, private eventAggregator: EventAggregator, private router: AppRouter, private taskQueue: TaskQueue) {
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
            let element: any = this.element;

            while (element) {
                if (element && element.au && element.au['nav-active']) {
                    element.au['nav-active'].viewModel.active = true;
                }
                element = element.parentElement
            }
        }
    }

    private click() {
        if (!this.routerIsProcessing) {
            // The router is not processing because the route is already active.
            this.active = !this.active;
        }

        this.routerIsProcessing = false;
    }

    private routerNavigationSuccess(event: { instruction: NavigationInstruction }) {
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

    private getParams(instructions: NavigationInstruction[]) {
        let params: any = {};

        for (let instruction of instructions) {
            for (let parameterName in instruction.params) {
                params[parameterName] = instruction.params[parameterName];
            }
        }

        return params;
    }

    private routeMatch(route: string) {
        return route === this.route || route.startsWith(this.route + '.');
    }

    private paramsMatch(params: { [name: string]: string | number }) {
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
}