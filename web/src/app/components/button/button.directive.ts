import { Directive, HostBinding, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appButton]',
})
export class ButtonDirective {
    @HostBinding('class.app-button') apply: boolean = true;
}
