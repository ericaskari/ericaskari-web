import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { map, tap } from 'rxjs/operators';

import { NotificationService } from './notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    @HostBinding('class.left-0') leftZero = false;
    faCoffee = faCoffee;
    isMobile$ = this.breakpointObserver.observe(['(min-width: 600px)']).pipe(
        map((d) => !d.matches),
        tap((d) => {
            this.leftZero = d;
        })
    );

    constructor(public notificationService: NotificationService, public breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {}
}
