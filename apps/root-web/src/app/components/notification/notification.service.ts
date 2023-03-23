import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications = new BehaviorSubject<{ type: 'error' | 'success'; title: string; message: string } | null>(null);

    add(type: 'error' | 'success', title: string, message: string, time: number = 3000) {
        this.notifications.next({ type, title, message });

        setTimeout(() => {
            this.notifications.next(null);
        }, time);
    }

    clear() {
        this.notifications.next(null);
    }
}
