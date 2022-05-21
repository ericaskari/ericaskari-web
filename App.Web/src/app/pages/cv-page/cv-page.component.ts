import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ContactFormService } from '@ericaskari/web-forms';

@Component({
    selector: 'app-contact-home-page',
    templateUrl: './cv-page.component.html',
    styleUrls: ['./cv-page.component.scss'],
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
    providers: [ContactFormService],
})
export class CvPageComponent {
    constructor(public contactFormService: ContactFormService) {}
}
