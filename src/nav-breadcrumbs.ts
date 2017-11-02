import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class NavBreadcrumbsCustomElement {
    router: Router;

    constructor(router: Router) {
        while (router.parent) {
            router = router.parent;
        }
        this.router = router;
    }
}