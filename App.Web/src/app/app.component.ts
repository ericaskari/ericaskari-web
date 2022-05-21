import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { BootstrapStoreSelectors } from '@ericaskari/web-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetVersionResponse } from '@ericaskari/model';

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
    appVersion$: Observable<GetVersionResponse | null> = this.store.select(BootstrapStoreSelectors.appVersion);
    apiVersion$: Observable<GetVersionResponse | null> = this.store.select(BootstrapStoreSelectors.apiVersion);

    constructor(private store: Store) {
        this.appVersion$.subscribe((appVersion) => {
            console.log('appVersion: ', appVersion?.buildVersion);
        });
        this.apiVersion$.subscribe((apiVersion) => {
            console.log('apiVersion: ', apiVersion?.buildVersion);
        });
    }
}
