import { NavigationInstruction, RouteConfig, Router } from 'aurelia-router';

export class InstructionsFilterValueConverter {
    toView(navigationInstructions: NavigationInstruction[]) {
        if (!navigationInstructions) {
            return [];
        }

        return navigationInstructions.map(x => {
            if (x.config.navModel && x.config.navModel.title && x.config.settings.breadcrumb !== false) {
                const enabled = x.config.settings.breadcrumb !== 'disabled';
                return {
                    href: enabled ? this.getHref(x) : undefined,
                    title: x.config.navModel.title
                };
            }
        }).filter(x => x);
    }

    private getHref(navigationInstruction: NavigationInstruction) {
        const params = JSON.parse(JSON.stringify(navigationInstruction.params));
        if ('childRoute' in params) {
            delete params['childRoute'];
        }

        const router = navigationInstruction.router;
        const routeName = navigationInstruction.config.name;
        if (!routeName) {
            return;
        }

        try {
            return router.generate(routeName, params);
        }
        catch (error) {
            const configs = router.routes.filter(x => x.name === routeName);
            if (configs.length > 1) {
                // There are multiple configs with the same name
                for (const config of configs) {
                    const href = tryGenerate(router, config, params);
                    if (href) {
                        return href;
                    }
                }
            }
            throw error;
        }
    }
}

function tryGenerate(router: Router, config: RouteConfig, params: any) {
    try {
        return router.generate(config, params);
    }
    catch {
        return undefined;
    }
}