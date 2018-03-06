import { AppRouter } from 'aurelia-router';
import { TaskQueue } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RouteMapper } from 'ur-route-mapper';
export declare class NavHref {
    private element;
    private routeMapper;
    private eventAggregator;
    private router;
    private taskQueue;
    route?: string;
    params: any;
    active?: boolean;
    private routerIsProcessing;
    private disposables;
    constructor(element: Element, routeMapper: RouteMapper, eventAggregator: EventAggregator, router: AppRouter, taskQueue: TaskQueue);
    attached(): void;
    detached(): void;
    processChange(): void;
    activeChanged(): void;
    private click();
    private routerNavigationSuccess(event);
    private getParams(instructions);
    private routeMatch(route);
    private paramsMatch(params);
}
