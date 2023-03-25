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
            tap(([webRuntimeEnvs, apiRuntimeEnvs]) => {
                BootstrapService.webRuntimeEnvironment = webRuntimeEnvs;
                BootstrapService.apiRuntimeEnvironment = apiRuntimeEnvs;
                console.log(`webRuntimeEnvironment buildVersion: ${webRuntimeEnvs.buildVersion}`);
                console.log(`apiRuntimeEnvironment buildVersion: ${apiRuntimeEnvs.buildVersion}`);
                this.analyticsService.initAnalytics(webRuntimeEnvs.tagManagerContainerId);
                registerLocaleData(localeEn);
                registerLocaleData(localeFi);
                this.translate.setDefaultLang('en');
                this.translate.use(localStorage.getItem('lang') ?? 'en');
            }),
            map(() => true)
        );
    }
}
