import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appFormRow]',
})
export class FormRowDirective {
    @HostBinding('class.app-form-row') apply: boolean = true;
}
