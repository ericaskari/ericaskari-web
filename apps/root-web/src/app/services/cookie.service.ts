import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
export enum CookiesConsentResponse {
    NOT_RESPONDED,
    GRANTED,
    DENIED
}
@Injectable({ providedIn: 'root' })
export class CookieService {
    private cookiesConsent$ = new BehaviorSubject(CookiesConsentResponse.NOT_RESPONDED);
    private showConsent$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
        this.cookiesConsent$.next(
            this.isCookiesConsentResponded
                ? this.isCookiesAllowed
                    ? CookiesConsentResponse.GRANTED
                    : CookiesConsentResponse.DENIED
                : CookiesConsentResponse.NOT_RESPONDED
        );
        this.showConsent$.next(!this.isCookiesConsentResponded);
    }

    private readonly cookieName = 'cookieconsent_status';

    public get cookiesConsentStatus$() {
        return this.cookiesConsent$.asObservable();
    }
    public get showConsentStatus$() {
        return this.showConsent$.asObservable();
    }

    public get isCookiesConsentResponded() {
        return this.cookie[this.cookieName] === 'allow' || this.cookie[this.cookieName] === 'deny';
    }

    private get isCookiesAllowed() {
        return this.cookie[this.cookieName] === 'allow';
    }

    public showConsent() {
        this.showConsent$.next(true);
    }

    public respondCookieConsent(response: boolean): void {
        this.showConsent$.next(false);
        this.setCookie(this.cookieName, response ? 'allow' : 'deny', 365);
        this.cookiesConsent$.next(response ? CookiesConsentResponse.GRANTED : CookiesConsentResponse.DENIED);
    }

    private setCookie(cname: string, cvalue: any, exdays: number) {
        const d = new Date(Date.now() + exdays * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    private get cookie(): Record<string, string> {
        return document.cookie
            .split(';')
            .map((x) => x.trim().split('='))
            .reduce(
                (x, [key, val]) => ({
                    ...x,
                    [key]: val
                }),
                {}
            );
    }
}
