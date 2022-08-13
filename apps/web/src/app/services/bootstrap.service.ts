import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FrontendRuntimeEnvironment } from '@ericaskari/web/common';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Injectable({
    providedIn: 'root'
})
export class BootstrapService {
    public static runtimeEnvironment: FrontendRuntimeEnvironment = {
        buildVersion: 'none',
        tagManagerContainerId: 'none'
    };

    constructor(private httpClient: HttpClient, private store: Store, private gtmService: GoogleTagManagerService) {}

    static get useFactory(): (appService: BootstrapService) => () => Observable<boolean> {
        return (appService: BootstrapService) => {
            return () => appService.initializeApp();
        };
    }

    initializeApp(): Observable<boolean> {
        return this.httpClient.get<FrontendRuntimeEnvironment>('/assets/runtime-environment.json').pipe(
            catchError(() => of(BootstrapService.runtimeEnvironment)),
            tap((x) => (BootstrapService.runtimeEnvironment = x)),
            tap((x) => ((this.gtmService as unknown as { config: { id: string } }).config.id = x.tagManagerContainerId)),
            map(() => true)
        );
    }
}
