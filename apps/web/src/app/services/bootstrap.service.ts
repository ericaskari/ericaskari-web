import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FrontendRuntimeEnvironment } from '@ericaskari/web/common';
import { AnalyticsService } from './analytics.service';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFi from '@angular/common/locales/fi';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class BootstrapService {
    public static runtimeEnvironment: FrontendRuntimeEnvironment = {
        buildVersion: 'none',
        tagManagerContainerId: 'none'
    };

    constructor(private httpClient: HttpClient, private analyticsService: AnalyticsService, private translate: TranslateService) {}

    static get useFactory(): (appService: BootstrapService) => () => Observable<boolean> {
        return (appService: BootstrapService) => {
            return () => appService.initializeApp();
        };
    }

    initializeApp(): Observable<boolean> {
        return this.httpClient.get<FrontendRuntimeEnvironment>('/assets/runtime-environment.json').pipe(
            catchError(() => of(BootstrapService.runtimeEnvironment)),
            tap((x) => (BootstrapService.runtimeEnvironment = x)),
            tap((x) => this.analyticsService.initAnalytics(x.tagManagerContainerId)),
            tap(() => registerLocaleData(localeEn)),
            tap(() => registerLocaleData(localeFi)),
            tap(() => this.translate.setDefaultLang('en')),
            tap(() => this.translate.use(localStorage.getItem('lang') ?? 'en')),
            map(() => true)
        );
    }
}
