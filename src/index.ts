import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./nav-breadcrumbs'),
        PLATFORM.moduleName('./nav-active'),
        PLATFORM.moduleName('./nav-href'),
        PLATFORM.moduleName('./nav-toggle')
    ]);
}