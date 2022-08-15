import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CookieService } from './cookie.service';
declare const initGoogleTagManager: (window: any, document: any, script: string, dataLayer: string, code: string) => void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService implements OnDestroy {
    currentRoute$: Observable<NavigationEnd> = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
    );

    cookiesConsent$ = this.cookieService.cookiesConsentStatus$.subscribe((status) => {
        if (status) {
            this.grantAnalytics();
        } else {
            this.denyAnalytics();
        }
    });

    started = false;

    constructor(private router: Router, private cookieService: CookieService) {}

    public initAnalytics(tagManagerContainerId: string) {
        if (this.started) {
            return;
        }

        initGoogleTagManager(window, document, 'script', 'dataLayer', tagManagerContainerId);
        gtag('config', tagManagerContainerId, { anonymize_ip: true });
        this.started = true;
    }

    public grantAnalytics() {
        gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted'
        });
    }

    public denyAnalytics() {
        gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'denied'
        });
    }

    ngOnDestroy(): void {
        this.cookiesConsent$.unsubscribe();
    }
}
