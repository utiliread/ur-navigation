import { NavigationInstruction } from 'aurelia-router';
export declare class InstructionsFilterValueConverter {
    toView(navigationInstructions: NavigationInstruction[]): {
        href: string;
        title: string;
    }[];
    private getHref(navigationInstruction);
}
