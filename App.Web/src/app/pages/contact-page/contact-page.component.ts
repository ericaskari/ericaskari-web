import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ContactFormService } from "@ericaskari/web-forms";
import { GenericEndpointService } from "@ericaskari/web-endpoints";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";
import { catchError, concatMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'contact-home-page',
    templateUrl: './contact-page.component.html',
    styleUrls: [ './contact-page.component.scss' ],
    animations: [
        trigger('landingText', [
            transition('* => visible', [
                animate('1s')
            ]),
            state('visible', style({
                opacity: 1
            }))
        ])
    ],
    providers: [ ContactFormService ]
})
export class ContactPageComponent {
    constructor(
        public contactFormService: ContactFormService,
        public genericEndpointService: GenericEndpointService,
        private router: Router,
        private readonly notifications: TuiAlertService) {
    }

    onClick(event: MouseEvent): void {
        console.log(this.contactFormService.value());
        this.genericEndpointService.contact(this.contactFormService.value())
            .pipe(
                map(data => 1),
                catchError(err => {
                    return of(0)
                }),
                concatMap(x => {
                    if (x === 1) {
                        this.notifications.open(`Email sent.`, {
                            autoClose: true,
                            status: TuiNotification.Success,
                            data: 1
                        }).subscribe();
                        return of(x);
                    } else {
                        this.notifications.open(`An error occurred.`, {
                            autoClose: true,
                            status: TuiNotification.Error,
                            data: 0
                        }).subscribe();
                        return of(0);
                    }
                })
            )
            .subscribe(data => {
                console.log(data);

                if (data === 1) {
                    this.router.navigate([ '/' ])
                }
            });
    }
}
