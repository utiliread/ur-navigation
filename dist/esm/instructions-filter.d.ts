import { NavigationInstruction } from 'aurelia-router';
export declare class InstructionsFilterValueConverter {
    toView(navigationInstructions: NavigationInstruction[]): ({
        href: string | undefined;
        title: string;
    } | undefined)[];
    private getHref(navigationInstruction);
}
