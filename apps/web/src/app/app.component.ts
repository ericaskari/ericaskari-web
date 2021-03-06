import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { ClickService } from './services/click.service';
import { TranslateService } from '@ngx-translate/core';
import localeFi from '@angular/common/locales/fi';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { frontendEnvironment } from '../environments/frontend-environment';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/ban-types
declare let gtag: Function;

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),

        query(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))], { optional: true }),

        query(':enter', [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))], { optional: true })
    ])
]);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        fadeAnimation,
        trigger('darkenBg', [
            transition('* => visible', [animate('1s')]),
            state(
                'visible',
                style({
                    filter: 'brightness(90%)'
                })
            )
        ])
    ]
})
export class AppComponent implements OnInit {
    currentRoute$: Observable<NavigationEnd> = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
    );

    constructor(
        private contexts: ChildrenOutletContexts,
        private clickService: ClickService,
        private translate: TranslateService,
        private router: Router
    ) {
        registerLocaleData(localeEn);
        registerLocaleData(localeFi);
        translate.setDefaultLang('en');
        translate.use(localStorage.getItem('lang') ?? 'en');
    }

    ngOnInit(): void {
        this.setUpAnalytics();
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }

    @HostListener('document:click', ['$event'])
    documentClick(event: any): void {
        this.clickService.documentClickedTarget.next(event.target);
    }

    setUpAnalytics() {
        if (frontendEnvironment.production) {
            this.currentRoute$.subscribe((event) => {
                gtag('config', 'G-20PB8EKCKG', {
                    page_path: event.urlAfterRedirects
                });
            });
        }
    }
}
