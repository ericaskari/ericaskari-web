import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { TextAnimationDirective } from '../../components/text-animation.directive';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [
        TextAnimationDirective.getTextChangeAnimation(),
        trigger('landingText', [
            transition('* => visible', [animate('1s')]),
            state(
                'visible',
                style({
                    opacity: 1
                })
            )
        ])
    ]
})
export class HomePageComponent {
    constructor(public translate: TranslateService) {}
    onClick(event: MouseEvent): void {
        console.info('click', event);
    }
}
