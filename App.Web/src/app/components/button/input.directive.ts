import { Directive, HostBinding, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appInput]',
})
export class InputDirective {
    @HostBinding('class.app-input') apply: boolean = true;

    @HostBinding('class.app-input-invalid') get invalid() {
        return this.ngControl.invalid && this.ngControl.touched;
    }
    @HostBinding('class.app-input-valid') get valid() {
        return !this.ngControl.invalid && this.ngControl.touched;
    }

    constructor(@Self() private ngControl: NgControl) {}
}
