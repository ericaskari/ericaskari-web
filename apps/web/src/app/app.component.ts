import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { ClickService } from './services/click.service';
import { CookieService } from './services/cookie.service';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),

        query(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))], { optional: true }),

        query(':enter', [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))], { optional: true })
    ])
]);

const darkenBackground = trigger('darkenBg', [
    transition('* => visible', [animate('1s')]),
    state(
        'visible',
        style({
            filter: 'brightness(90%)'
        })
    )
]);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation, darkenBackground]
})
export class AppComponent {
    constructor(private clickService: ClickService, public cookieService: CookieService) {}

    @HostListener('document:click', ['$event'])
    documentClick(event: PointerEvent): void {
        this.clickService.documentClickedTarget.next(event.target);
    }
}
