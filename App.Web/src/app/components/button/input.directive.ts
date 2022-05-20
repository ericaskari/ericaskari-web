import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appInput]',
})
export class InputDirective {
    @HostBinding('class.app-input') apply: boolean = true;

    constructor() {}
}
