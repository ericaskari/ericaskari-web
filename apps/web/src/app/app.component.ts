import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

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
                    filter: 'brightness(80%)'
                })
            )
        ])
    ]
})
export class AppComponent {
    constructor(private store: Store) {}
}
