import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { BootstrapStoreSelectors } from "@ericaskari/state";
import { Store } from "@ngrx/store";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { BootstrapResponseModel } from "@ericaskari/model";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: [ './home-page.component.scss' ],
    animations: [
        trigger('landingText', [
            transition('* => visible', [
                animate('3s')
            ]),
            state('visible', style({
                opacity: 1
            }))
        ]),
        trigger('darkenBg', [
            transition('* => visible', [
                animate('4s')
            ]),
            state('visible', style({
                filter: 'brightness(50%)'
            }))
        ]),
    ]
})
export class HomePageComponent {
    isOpen = true;


    version$: Observable<BootstrapResponseModel | null> = this.store.select(BootstrapStoreSelectors.bootstrapData)

    constructor(private store: Store) {
    }

}
