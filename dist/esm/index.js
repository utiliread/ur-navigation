import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./nav-breadcrumbs'),
        PLATFORM.moduleName('./nav-active'),
        PLATFORM.moduleName('./nav-href'),
        PLATFORM.moduleName('./nav-toggle')
    ]);
}
//# sourceMappingURL=index.js.map