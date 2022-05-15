import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';

import { Observable } from "rxjs";
import { BootstrapStoreActions, BootstrapStoreSelectors } from "@ericaskari/web-state";


@Injectable({
    providedIn: 'root'
})
export class BootstrapService {

    constructor(private httpClient: HttpClient, private store: Store) {
    }

    static get useFactory(): (appService: BootstrapService) => () => Observable<boolean> {
        return (appService: BootstrapService) => {
            return () => appService.initializeApp();
        };
    }

    initializeApp(): Observable<boolean> {
        this.store.dispatch(BootstrapStoreActions.AppStarted());

        return this.store
            .select(BootstrapStoreSelectors.finished)
            .pipe(tap(console.log), first());
    }
}
