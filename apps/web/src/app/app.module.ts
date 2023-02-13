import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { frontendEnvironmentInterfaceInjectionToken } from '@ericaskari/web/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { frontendEnvironment } from '../environments/frontend-environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { ButtonDirective } from './components/button/button.directive';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BootstrapService } from './services/bootstrap.service';
import { CommonModule } from '@angular/common';
import { InputDirective } from './components/button/input.directive';
import { FormDirective } from './components/button/form.directive';
import { FormHeaderDirective } from './components/button/form-header.directive';
import { FormActionDirective } from './components/button/form-action.directive';
import { FormRowDirective } from './components/button/form-row.directive';
import { CvPageComponent } from './pages/cv-page/cv-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { CustomRouterStateSerializer } from '@ericaskari/web/state';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';
import { LocalizedDatePipe } from './components/localized-date.pipe';
import { TextAnimationDirective } from './components/text-animation.directive';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { routerReducer } from '@ngrx/router-store';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { EducationListToTimelineListPipe } from './pipes/education-list-to-timeline-list.pipe';
import { WorkExpListToTimelineListPipe } from './pipes/work-exp-list-to-timeline-list.pipe';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const store = [
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
        {
            router: routerReducer
        },
        {
            metaReducers: [],
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }
    ),
    StoreRouterConnectingModule.forRoot({
        serializer: CustomRouterStateSerializer
    }),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: frontendEnvironment.production,
        serialize: false
    })
];

@NgModule({
    declarations: [
        AppComponent,
        TimelineComponent,
        HomePageComponent,
        NotificationComponent,
        ButtonDirective,
        InputDirective,
        FormDirective,
        FormHeaderDirective,
        FormRowDirective,
        FormActionDirective,
        NavbarComponent,
        CvPageComponent,
        LangSelectorComponent,
        LocalizedDatePipe,
        TextAnimationDirective,
        CookieConsentComponent,
        GamesPageComponent,
        EducationListToTimelineListPipe,
        WorkExpListToTimelineListPipe
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        LayoutModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        }),
        ...store
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: BootstrapService.useFactory,
            deps: [BootstrapService],
            multi: true
        },
        {
            provide: frontendEnvironmentInterfaceInjectionToken,
            useValue: frontendEnvironment
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
