import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appFormHeader]',
})
export class FormHeaderDirective {
    @HostBinding('class.app-form-header') apply: boolean = true;
}
