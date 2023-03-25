import { animate, state, style, transition, trigger } from '@angular/animations';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appTextAnimation]'
})
export class TextAnimationDirective {
    private currentValue: any;
    private hasView = false;

    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

    @Input() set appTextAnimation(val: any) {
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (val !== this.currentValue) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.currentValue = val;
        }
    }

    static getTextChangeAnimation() {
        return trigger('textChangeAnimation', [
            state('void', style({ opacity: 0 })),
            state('*', style({ opacity: 1 })),
            transition('void => *', [animate('0.2s 0.2s ease-in')]),
            transition('* => void', [animate('0.2s ease-in')])
        ]);
    }
}
