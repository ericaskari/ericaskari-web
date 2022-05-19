import { Component, HostBinding, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from "./notification.service";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map, tap } from "rxjs/operators";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: [ './notification.component.scss' ]
})
export class NotificationComponent implements OnInit {
    @HostBinding('class.left-0') leftZero = false;
    faCoffee = faCoffee;
    isMobile$ = this.breakpointObserver.observe([ '(min-width: 600px)' ])
        .pipe(
            map(d => !d.matches),
            tap(d => {
                this.leftZero = d
            })
        );

    constructor(public notificationService: NotificationService,
                public breakpointObserver: BreakpointObserver) {
    }

    ngOnInit(): void {
    }

}
