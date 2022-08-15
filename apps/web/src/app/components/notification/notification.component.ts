import { Component, HostBinding } from '@angular/core';
import { tap } from 'rxjs/operators';

import { NotificationService } from './notification.service';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    constructor(public notificationService: NotificationService, public breakpointService: BreakpointService) {}

    onClick(_: MouseEvent) {
        this.notificationService.clear();
    }
}
