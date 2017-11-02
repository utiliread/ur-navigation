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
        if (!navigationInstruction.config.name) {
            return;
        }
        return navigationInstruction.router.generate(navigationInstruction.config.name, params);
    };
    return InstructionsFilterValueConverter;
}());
export { InstructionsFilterValueConverter };
