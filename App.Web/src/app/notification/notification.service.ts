import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    notifications = new BehaviorSubject<{ type: IconDefinition; message: string } | null>(null);

    constructor() {}

    add(type: IconDefinition, message: string, time: number = 3000) {
        this.notifications.next({ type, message });

        setTimeout(() => {
            this.notifications.next(null);
        }, time);
    }
}
