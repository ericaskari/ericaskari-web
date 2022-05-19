import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appButton]',
})
export class ButtonDirective {
    @HostBinding('class.app-button') apply: boolean = true;

    constructor() {}
}
