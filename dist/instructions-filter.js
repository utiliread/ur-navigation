export class InstructionsFilterValueConverter {
    toView(navigationInstructions) {
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
    getHref(navigationInstruction) {
        let params = JSON.parse(JSON.stringify(navigationInstruction.params));
        if ('childRoute' in params) {
            delete params['childRoute'];
        }
        if (!navigationInstruction.config.name) {
            return;
        }
        return navigationInstruction.router.generate(navigationInstruction.config.name, params);
    }
}
