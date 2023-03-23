import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appForm]',
})
export class FormDirective {
    @HostBinding('class.app-form') apply: boolean = true;
}
