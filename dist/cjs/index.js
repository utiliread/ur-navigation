"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./nav-breadcrumbs'),
        aurelia_framework_1.PLATFORM.moduleName('./nav-active'),
        aurelia_framework_1.PLATFORM.moduleName('./nav-href'),
        aurelia_framework_1.PLATFORM.moduleName('./nav-toggle')
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map