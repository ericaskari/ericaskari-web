import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appFormAction]',
})
export class FormActionDirective {
    @HostBinding('class.app-form-action') apply: boolean = true;
}
