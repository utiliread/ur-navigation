var InstructionsFilterValueConverter = /** @class */ (function () {
    function InstructionsFilterValueConverter() {
    }
    InstructionsFilterValueConverter.prototype.toView = function (navigationInstructions) {
        var _this = this;
        if (!navigationInstructions) {
            return [];
        }
        return navigationInstructions.map(function (x) {
            if (x.config.navModel && x.config.navModel.title && x.config.settings.breadcrumb !== false) {
                var enabled = x.config.settings.breadcrumb !== 'disabled';
                return {
                    href: enabled ? _this.getHref(x) : undefined,
                    title: x.config.navModel.title
                };
            }
        }).filter(function (x) { return x; });
    };
    InstructionsFilterValueConverter.prototype.getHref = function (navigationInstruction) {
        var params = JSON.parse(JSON.stringify(navigationInstruction.params));
        if ('childRoute' in params) {
            delete params['childRoute'];
        }
        var router = navigationInstruction.router;
        var routeName = navigationInstruction.config.name;
        if (!routeName) {
            return;
        }
        try {
            return router.generate(routeName, params);
        }
        catch (error) {
            var configs = router.routes.filter(function (x) { return x.name === routeName; });
            if (configs.length > 1) {
                // There are multiple configs with the same name
                for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
                    var config = configs_1[_i];
                    var href = tryGenerate(router, config);
                    if (href) {
                        return href;
                    }
                }
            }
            throw error;
        }
    };
    return InstructionsFilterValueConverter;
}());
export { InstructionsFilterValueConverter };
function tryGenerate(router, config) {
    try {
        return router.generate(config);
    }
    catch (_a) {
        return undefined;
    }
}
//# sourceMappingURL=instructions-filter.js.map