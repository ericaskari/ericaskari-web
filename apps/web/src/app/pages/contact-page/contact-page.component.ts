import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactEndpointService } from '@ericaskari/web/endpoints';
import { ContactFormService } from '@ericaskari/web/forms';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { TextAnimationDirective } from '../../components/text-animation.directive';

@Component({
    selector: 'app-contact-home-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss'],
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
    ],
    providers: [ContactFormService]
})
export class ContactPageComponent {
    constructor(
        public contactFormService: ContactFormService,
        public contactEndpointService: ContactEndpointService,
        private notificationService: NotificationService,
        private router: Router,
        public translate: TranslateService
    ) {}

    onClick(event: MouseEvent): void {
        if (this.contactFormService.formGroup.invalid) {
            this.contactFormService.formGroup.markAllAsTouched();
            return;
        }
        this.contactEndpointService
            .sendContactForm(this.contactFormService.value())
            .pipe(
                map((data) => 1),
                catchError((err) => {
                    return of(0);
                }),
                tap((x) => {
                    if (x === 1) {
                        this.notificationService.add('success', 'Email sent.', '');
                    } else {
                        this.notificationService.add('success', 'An error occurred.', '');
                    }
                })
            )
            .subscribe((data) => {
                console.log(data);

                if (data === 1) {
                    this.router.navigate(['/']);
                }
            });
    }
}
