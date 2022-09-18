import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiRuntimeEnvironment, WebRuntimeEnvironment } from '@ericaskari/web/common';
import { AnalyticsService } from './analytics.service';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFi from '@angular/common/locales/fi';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class BootstrapService {
    public static webRuntimeEnvironment: WebRuntimeEnvironment = {
        buildVersion: 'none',
        tagManagerContainerId: 'none'
    };
    public static apiRuntimeEnvironment: ApiRuntimeEnvironment = {
        buildVersion: 'none'
    };

    constructor(private httpClient: HttpClient, private analyticsService: AnalyticsService, private translate: TranslateService) {}

    static get useFactory(): (appService: BootstrapService) => () => Observable<boolean> {
        return (appService: BootstrapService) => {
            return () => appService.initializeApp();
        };
    }

    initializeApp(): Observable<boolean> {
        return zip([
            this.httpClient
                .get<WebRuntimeEnvironment>('/assets/runtime-environment.json')
                .pipe(catchError(() => of(BootstrapService.webRuntimeEnvironment))),
            this.httpClient
                .get<ApiRuntimeEnvironment>('/api/runtime-environment')
                .pipe(catchError(() => of(BootstrapService.apiRuntimeEnvironment)))
        ]).pipe(
            tap(([webRuntimeEnvs]) => (BootstrapService.webRuntimeEnvironment = webRuntimeEnvs)),
            tap(([webRuntimeEnvs]) => this.analyticsService.initAnalytics(webRuntimeEnvs.tagManagerContainerId)),
            tap(() => registerLocaleData(localeEn)),
            tap(() => registerLocaleData(localeFi)),
            tap(() => this.translate.setDefaultLang('en')),
            tap(() => this.translate.use(localStorage.getItem('lang') ?? 'en')),
            tap(([webRuntimeEnvs]) => console.log(`webBuildVersion: ${webRuntimeEnvs.buildVersion}`)),
            tap(([_, apiRuntimeEnvs]) => console.log(`apiBuildVersion: ${apiRuntimeEnvs.buildVersion}`)),
            map(() => true)
        );
    }
}
