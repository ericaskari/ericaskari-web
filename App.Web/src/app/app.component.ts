import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { BootstrapStoreSelectors } from '@ericaskari/web-state';
import { Store } from '@ngrx/store';
import { NotificationService } from './notification/notification.service';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('darkenBg', [
            transition('* => visible', [animate('2s')]),
            state(
                'visible',
                style({
                    filter: 'brightness(80%)',
                })
            ),
        ]),
    ],
})
export class AppComponent {
    appVersion$: Observable<string | null> = this.store.select(BootstrapStoreSelectors.appVersion);
    apiVersion$: Observable<string | null> = this.store.select(BootstrapStoreSelectors.apiVersion);

    constructor(private store: Store, private notificationService: NotificationService) {
        this.notificationService.add(faAdd, 'Hellow', 30000);
    }
}
