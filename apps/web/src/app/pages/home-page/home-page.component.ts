import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [
        trigger('landingText', [
            transition('* => visible', [animate('1s')]),
            state(
                'visible',
                style({
                    opacity: 1,
                })
            ),
        ]),
    ],
})
export class HomePageComponent {
    onClick(event: MouseEvent): void {
        console.info('click', event);
    }
}
